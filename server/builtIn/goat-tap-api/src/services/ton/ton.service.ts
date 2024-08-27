import { Injectable } from '@nestjs/common';
import { InjectRepository, Repository } from "@core-api/nest-typeorm-postgres";
import { BoostEntity, UserEntity } from "@/entities";
import { ChainConfig, TelegramBotConfig, tonPriceConfig } from "@/config";
import { TonClient, Transaction } from '@ton/ton';
import { CommonMessageInfoInternal } from '@ton/core';
import { TransactionEntity } from "@/entities/transaction.entity";
import axios from 'axios';
import { TransactionCreateDtoToEntityMapper } from "@/mappers/transaction/transaction.create.mapper";
import { BoostType, IBoostCreation } from "@core-ui/goat-tap-types";
import { addHours } from "date-fns";
import { BoostCreationToBoostEntityMapper } from "@/mappers/boost/boost.create.mapper";

export enum CHAIN {
  MAINNET = 'MAINNET',
  TESTNET = 'TESTNET',
}

const TON_TOKEN_UNIT = 1000000000;

const maketransactionsGetterApiUrl = (
  account = TelegramBotConfig.TELEGRAM_BOT_WALLET_ADDRESS,
  limit = 256,
  offset = 0,
  sort = 'desc',
) => `https://toncenter.com/api/v3/transactions?account=${account}&limit=${limit}&offset=${offset}&sort=${sort}`

@Injectable()
export class TonApiService {
  private client: TonClient | undefined = undefined;;

  private create() {
    // const endpoint = await getHttpEndpoint({ network: 'testnet' });
    if (ChainConfig.IS_MAINNET) {
      this.client = new TonClient({
        endpoint: 'https://mainnet-v4.tonhubapi.com',
      });
    } else {
      this.client = new TonClient({
        endpoint: 'https://testnet-v4.tonhubapi.com',
      });
    }
  }

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
    @InjectRepository(BoostEntity)
    private boostRepo: Repository<BoostEntity>,
  ) {
    this.create();
  }

  public async findIncomingTransaction(transaction: Transaction): Promise<Transaction | null> {
    const inMessage = transaction.inMessage?.info;
    if (inMessage?.type !== 'internal') return null;
    return this.client!.tryLocateSourceTx(inMessage.src, inMessage.dest, inMessage.createdLt.toString());
  }

  public async findOutgoingTransactions(transaction: Transaction): Promise<Transaction[]> {
    const outMessagesInfos = transaction.outMessages.values()
      .map(message => message.info)
      .filter((info): info is CommonMessageInfoInternal => info.type === 'internal');

    return Promise.all(
      outMessagesInfos.map((info) => this.client!.tryLocateResultTx(info.src, info.dest, info.createdLt.toString())),
    );
  }

  public async traverseIncomingTransactions(transaction: Transaction): Promise<void> {
    const inTx = await this.findIncomingTransaction(transaction);
    // now you can traverse this transaction graph backwards
    if (!inTx) return;
    await this.traverseIncomingTransactions(inTx);
  }

  public async traverseOutgoingTransactions(transaction: Transaction): Promise<void> {
    const outTxs = await this.findOutgoingTransactions(transaction);
    // do smth with out txs
    for (const out of outTxs) {
      await this.traverseOutgoingTransactions(out);
    }
  }

  public async buyAutoBoostPack(sourceAddress: string) {
    try {
      const user = await this.usersRepository.createQueryBuilder("user")
        .leftJoinAndSelect("user.boosts", "boosts")
        .where("user.ton_wallet_info ->> 'address' = :sourceAddress", { sourceAddress })
        .getOne();

      if (!user) {
        // console.error("buyAutoBoostPack --- no user found")
        return;
      }
      const boosts: BoostEntity[] = user.boosts || [];
      const boost = boosts.find((b) => b.type === BoostType.AutoBoot) || {
        level: 1,
        type: BoostType.AutoBoot,
        userId: user!.id,
        expiredAt: new Date(),
        goatPrice: 0,
        tonPrice: Number(tonPriceConfig[BoostType.AutoBoot]),
      } as IBoostCreation;
      if (boost.expiredAt && new Date(boost.expiredAt) > new Date()) {
        boost.expiredAt = new Date(addHours(new Date(boost.expiredAt!), tonPriceConfig.autoBoostValue));
      } else {
        boost.expiredAt = new Date(addHours(new Date(), tonPriceConfig.autoBoostValue));
      }
      boost.level = boost.level + 1;
      // reset energy
      // user.energy = 0;
      await this.usersRepository.save(user as UserEntity);
      await this.boostRepo.save(BoostCreationToBoostEntityMapper.map(boost, { user }));
      return user;
    } catch (error: any) {
      // console.error("buyAutoBoostPack ---", error.message)
    }
  }

  public async syncTransaction(isForceBuyBoost?: boolean): Promise<void> {
    const transactionsRs = await axios.get(maketransactionsGetterApiUrl());
    const allTransactions = transactionsRs.data?.transactions || [];
    const addressMapper = transactionsRs.data?.address_book || {};
    for (const transaction of allTransactions) {
      const existingTransaction = await this.transactionRepo.findOne({ where: { hash: transaction.hash } });
      if (existingTransaction) break;
      const newTransaction = TransactionCreateDtoToEntityMapper.map(transaction, { addressMapper });
      if (isForceBuyBoost && Number(newTransaction.value) === Number(tonPriceConfig[BoostType.AutoBoot]) * TON_TOKEN_UNIT && newTransaction.source) {
        try {
          const user = await this.buyAutoBoostPack(newTransaction.source.toLowerCase())
          console.log("user", user)
          if (user) {
            newTransaction.processed = true;
            await this.transactionRepo.save(newTransaction);
          }
        } catch (error: any) {
          // console.error("syncTransaction --- buyAutoBoostPack failed", error.message)
        }
      } else if (!isForceBuyBoost) {
        await this.transactionRepo.save(newTransaction);
      }
    }
  }

  public async checkIsTokenTransfered(userId: number | string, packPrice: number) {
    await this.syncTransaction();
    const currentUser = await this.usersRepository.findOne({ where: { id: Number(userId) } });
    const tonAddress = currentUser?.tonWalletInfo?.address;
    const userTransaction: TransactionEntity | null = await this.transactionRepo.findOne({
      where: {
        source: tonAddress,
        destination: TelegramBotConfig.TELEGRAM_BOT_WALLET_ADDRESS,
        value: (TON_TOKEN_UNIT * packPrice).toString(),
        processed: false,
      }
    });
    if (userTransaction) {
      await this.transactionRepo.save({
        ...userTransaction,
        processed: true,
      });
      return true;
    }
    return false;
  }
}
