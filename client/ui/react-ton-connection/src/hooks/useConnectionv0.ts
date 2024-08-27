import { CHAIN, useTonConnectModal, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Address, beginCell, toNano } from '@ton/ton';
import { useEffect, useState } from "react";
import { useInterval } from "@core-utils/utils-helpers";

const validUntil = 120 * 1000;

export enum TransactionState {
  INITIAL = "INITIAL",
  PURCHASING = "PURCHASING",
  PURCHASED = "PURCHASED",
}

export const useConnectionv0 = (
  config: {
    tonBotAddress: string;
    isTestnet: boolean;
    checkIsTokenTransfered?: (params: any) => Promise<any>;
  } = {
      tonBotAddress: "",
      isTestnet: true,
    },
  notifyError: (message: string) => void
) => {
  const wallet = useTonWallet();
  const modal = useTonConnectModal();
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const [pendingTransaction, setPendingTransaction] = useState<any>(undefined);
  const [transactionState, setTransacionState] = useState<TransactionState | null>(null);
  const [currentPackPrice, setCurrentPackPrice] = useState<number>(0)
  let checkIsTokenTransferedTimes = 0;

  const createTransaction = (packID: number, amount: number, price: number, userId: string) => {
    const transactionPayload = beginCell().storeUint(0, 32).storeStringTail(`${userId}-${packID}-${amount}`).endCell();
    const aquaAddress = Address.parse(config.tonBotAddress)?.toString({ bounceable: false });
    const _amount = toNano(amount * price)?.toString();
    const messages = [
      {
        address: aquaAddress,
        amount: _amount,
        payload: transactionPayload.toBoc()?.toString('base64')
      }
    ];
    const rsTransaction = {
      validUntil: Math.floor(Date.now() / 1000) + validUntil,
      network: config.isTestnet ? CHAIN.TESTNET : CHAIN.MAINNET,
      from: wallet?.account?.address || '',
      messages: messages
    };
    if (!wallet?.account || !packID) {
      setPendingTransaction(rsTransaction);
      return modal.open();
    }
    return rsTransaction;
  };

  const sendTransaction = (packID: number, amount: number, price: number, userId: string) => {
    const _transactionState = transactionState || localStorage.getItem("transactionState");
    if (_transactionState === TransactionState.PURCHASING) return;
    setCurrentPackPrice(price);
    const transactionRequest = createTransaction(packID, amount, price, userId);
    if (transactionRequest) {
      localStorage.setItem("packPrice", price.toString());
      setTransacionState(TransactionState.PURCHASING);
      localStorage.setItem("transactionState", TransactionState.PURCHASING);
      tonConnectUI.sendTransaction(transactionRequest)
    } else {
      throw new Error("")
    }
  }

  useEffect(() => {
    if (pendingTransaction && wallet?.account) {
      localStorage.setItem("packPrice", currentPackPrice.toString());
      setTransacionState(TransactionState.PURCHASING);
      localStorage.setItem("transactionState", TransactionState.PURCHASING);
      tonConnectUI.sendTransaction(pendingTransaction);
      setPendingTransaction(undefined);
    }
  }, [wallet?.account]);

  const checkIsTokenTransfered = async (packPrice: number) => {
    try {
      const transactionRes = await config.checkIsTokenTransfered?.(packPrice);
      if (transactionRes === true || transactionRes === "true") {
        setTransacionState(TransactionState.PURCHASED);
        localStorage.setItem("transactionState", TransactionState.PURCHASED)
        setCurrentPackPrice(0);
        checkIsTokenTransferedTimes = 0;
        localStorage.setItem("packPrice", "0")
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  useInterval(() => {
    const _price = parseFloat(localStorage.getItem("packPrice") || "0")
    const _transactionState = localStorage.getItem("transactionState")
    if (_price && _transactionState === TransactionState.PURCHASING) {
      if (checkIsTokenTransferedTimes > 5) {
        //handle failed transaction
        setTransacionState(TransactionState.PURCHASED);
        localStorage.setItem("transactionState", "")
        setCurrentPackPrice(0);
        checkIsTokenTransferedTimes = 0;
        localStorage.setItem("packPrice", "0");
        notifyError("Transaction failed to purchase pack because of timeout");
        modal.close();
        return;
      }
      checkIsTokenTransfered(_price);
      checkIsTokenTransferedTimes += 1;
    }
  }, 3000)

  return {
    transactionState,
    tonConnectUI,
    setOptions,
    sendTransaction,
    wallet,
    modal,
    checkIsTokenTransferedTimes
  }
}