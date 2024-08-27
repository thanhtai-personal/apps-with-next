import GoatTapSDK from "@core-sdk/goat-tap";
import { useConnection } from '@core-ui/react-ton-connection';
import { useEffect } from "react";
import { useGoatTapStore } from "../store";

export const useTonWalletConnection = (tonBotAddress: string, isTestnet?: boolean) => {

  const {
    sendTransaction,
    wallet,
    connectionState,
    modal,
    resetConnectionState
  } = useConnection({
    isTestnet: !!isTestnet,
    tonBotAddress: tonBotAddress,
  });

  const { accountStore } = useGoatTapStore()

  const buyBoosterPack = (packID: number, amount: number, price: number, userId: string) => {
    sendTransaction(packID, amount, price, userId)
  }

  useEffect(() => {
    if (wallet?.account && accountStore.account?.id) {
      GoatTapSDK.getInstance().getUserControl().patchUpdate(accountStore.account.id, {
        tonWalletInfo: {
          address: wallet.account.address,
          publicKey: wallet.account.publicKey,
        }
      })
    }
  }, [wallet?.account, accountStore.account?.id])

  return {
    wallet,
    buyBoosterPack,
    connectionState,
    modal,
    resetConnectionState
  }
}