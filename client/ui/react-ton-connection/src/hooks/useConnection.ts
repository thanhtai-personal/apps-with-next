import { CHAIN, useTonConnectModal, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Address, beginCell, toNano } from '@ton/ton';
import { useEffect, useState } from "react";

const validUntil = 120 * 1000;

export enum ConnectionState {
  ConnectedWallet = "ConnectedWallet",
  RequestSent = "RequestSent",
}

export const useConnection = (
  config: {
    tonBotAddress: string;
    isTestnet: boolean;
  } = {
      tonBotAddress: "",
      isTestnet: true,
    },
) => {
  const wallet = useTonWallet();
  const modal = useTonConnectModal();
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const [connectionState, setConnectionState] = useState(wallet?.account ? ConnectionState.ConnectedWallet : null )

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
    return rsTransaction;
  };

  const sendTransaction = (packID: number, amount: number, price: number, userId: string) => {
    const transactionRequest = createTransaction(packID, amount, price, userId);
    if (transactionRequest) {
      tonConnectUI.sendTransaction(transactionRequest)
      setConnectionState(ConnectionState.RequestSent)
    } else {
      throw new Error("")
    }
  }

  useEffect(() => {
    if (wallet?.account) {
      setConnectionState(ConnectionState.ConnectedWallet);
    }
  }, [wallet?.account])

  const resetConnectionState = () => {
    setConnectionState(null)
  }

  return {
    tonConnectUI,
    setOptions,
    sendTransaction,
    wallet,
    modal,
    connectionState,
    resetConnectionState,
  }
}