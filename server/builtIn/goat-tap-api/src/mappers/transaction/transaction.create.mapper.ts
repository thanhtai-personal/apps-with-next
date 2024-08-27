import { TransactionEntity } from "@/entities/transaction.entity";

export class TransactionCreateDtoToEntityMapper {
  public static map(source: any, { addressMapper }: any): TransactionEntity {
    const rsSource = {
      account: addressMapper[source.account]?.user_friendly || source.account,
      accountStateAfter: {
        accountStatus: source.account_state_after?.account_status,
        balance: source.account_state_after?.balance,
        codeHash: source.account_state_after?.code_hash,
        dataHash: source.account_state_after?.data_hash,
        frozenHash: source.account_state_after?.frozen_hash,
        hash: source.account_state_after?.hash,
      },
      accountStateBefore: {
        accountStatus: source.account_state_before?.account_status,
        balance: source.account_state_before?.balance,
        codeHash: source.account_state_before?.code_hash,
        dataHash: source.account_state_before?.data_hash,
        frozenHash: source.account_state_before?.frozen_hash,
        hash: source.account_state_before?.hash,
      },
      blockRef: {
        seqno: source.block_ref?.seqno,
        shard: source.block_ref?.shard,
        workchain: source.block_ref?.workchain,
      },
      description: {
        aborted: source.description?.aborted,
        computePhSkipReason: source.description?.compute_ph?.skip_reason,
        computePhSkipType: source.description?.compute_ph?.skip_type,
        creditFirst: source.description?.credit_first,
        creditPhCredit: source.description?.creditP_ph_credit,
        destroyed: source.description?.destroyed,
        storagePhStatusChange: source.description?.storage_ph?.status_change,
        storagePhStorageFeesCollected: source.description?.storage_ph?.fee_collected,
        type: source.description?.type,
      },
      endStatus: source.end_status,
      hash: source.hash,
      inMsg: {
        bounce: source.in_msg?.bounce,
        bounced: source.in_msg?.bounced,
        createdAt: source.in_msg?.created_at,
        createdLt: source.in_msg?.created_lt,
        destination: addressMapper[source.in_msg?.destination]?.user_friendly || source.in_msg?.destination,
        fwdFee: source.in_msg?.fwd_fee,
        hash: source.in_msg?.hash,
        ihrDisabled: source.in_msg?.bounce,
        ihrFee: source.in_msg?.ihr_fee,
        importFee: source.in_msg?.import_fee,
        initState: source.in_msg?.init_state,
        messageContentBody: source.in_msg?.message_content?.body,
        messageContentDecodedComment: source.in_msg?.message_content?.decoded?.comment,
        messageContentDecodedType: source.in_msg?.message_content?.decoded?.type,
        messageContentHash: source.in_msg?.message_content?.hash,
        source: addressMapper[source.in_msg?.source]?.user_friendly || source.in_msg?.source,
        opcode: source.in_msg?.opcode,
        value: source.in_msg?.value,
      },
      lt: source.lt,
      mcBlockSeqno: source.mc_block_seqno,
      now: source.now,
      origStatus: source.orig_status,
      prevTransHash: source.prev_trans_hash,
      prevTransLt: source.prev_trans_lt,
      totalFees: source.total_fees,
      destination: source.in_msg?.destination,
      source: source.in_msg?.source,
      value: source.in_msg?.value,
    };
    return rsSource as TransactionEntity
  }
}