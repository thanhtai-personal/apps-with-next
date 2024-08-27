import { useEffect } from "react";
import { autoBootTonPrice, BoostType, ModalId, useGoatTapStore } from "../store"
import GoatTapSDK from "@core-sdk/goat-tap";
import { IUserResponse } from "@core-ui/goat-tap-types";
import { useTonWalletConnection } from "./useTonWalletConnection";
import { ConnectionState } from "@core-ui/react-ton-connection";

export const goatPriceConfig = {
  [BoostType.SuperCharge.toString()]: 200,
  [BoostType.MegaCharge.toString()]: 500,
};

export const useBooster = (botAddress: string, isTestnet?: boolean) => {
  const { accountStore, gameStore, boostStore } = useGoatTapStore();

  const { buyBoosterPack, connectionState, wallet, modal, resetConnectionState } = useTonWalletConnection(
    botAddress,
    isTestnet
  );

  const handleAutoBoot = async () => {
    try {
      if (wallet?.account) {
        boostStore.buying = true;
        buyBoosterPack(1, 1, autoBootTonPrice, accountStore.account!.id.toString());
      } else {
        boostStore.isConnectingWallet = true;
        modal.open();
      }
    } catch (error: any) {
      gameStore.messageQueue.push({
        children: error.message || "Ton transaction error",
        variant: "error",
      })
      boostStore.buying = false;
    }
  }

  const refetch = async () => {
    if (accountStore.account?.id) {
      try {
        const user = await GoatTapSDK.getInstance().getUserControl().getOne(accountStore.account!.id);
        accountStore.account = user as IUserResponse;
        boostStore.boostItems = boostStore.boostItems.map((item) => {
          const userBoost = accountStore.account?.boosts?.find((b) => b.type === item.type);
          return {
            ...item,
            ...userBoost,
            level: userBoost?.level || 0,
            tonPrice: userBoost?.tonPrice || (item.type === BoostType.AutoBoot ? 0.1 : 0),
            goatPrice: userBoost?.goatPrice || (item.type === BoostType.SuperCharge ? 200
              : item.type === BoostType.MegaCharge ? 500 : 0
            ),
          }
        })
      } catch (error: any) {
        gameStore.messageQueue.push({
          children: "refetch failed",
          variant: "error",
        })
      }
    }
  }

  const renewEnergy = async () => {
    if (accountStore.account && (accountStore.account?.energy || 0) < 2500) {
      try {
        await GoatTapSDK.getInstance().updateRenewEnergyTimes(accountStore.account!.id,
          (accountStore.account?.renewEnergyTimes || 1) - 1);
        const user = await GoatTapSDK.getInstance().getUserControl().patchUpdate(accountStore.account!.id,
          {
            energy: 2500
          });
        accountStore.account = user as IUserResponse;
        gameStore.messageQueue.push({
          children: "Your energy was fully filled",
          variant: "success",
        })
      } catch (error: any) {
        gameStore.messageQueue.push({
          children: error.message || "Renew Energy failed",
          variant: "error",
        })
      }
    } else {
      gameStore.messageQueue.push({
        children: "Your energy was full",
        variant: "info",
      })
    }
  }

  const buyBooster = async (boosterType: BoostType) => {
    switch (boosterType) {
      case BoostType.SuperCharge:
      case BoostType.MegaCharge:
        try {
          boostStore.buying = true;
          await GoatTapSDK.getInstance().buyBooster(boosterType as any);
          gameStore.modalShowing = ModalId.boostSuccess;
        } catch (error: any) {
          gameStore.messageQueue.push({
            children: error.message || "buy booster error",
            variant: "error",
          })
        } finally {
          boostStore.buying = false;
        }
        break;
      
      case BoostType.AutoBoot:
        await handleAutoBoot();
        break;
      
      default:
        break;
    }
    refetch();
  }

  const refetchBalance = async () => {
    if (accountStore.account?.id) {
      try {
        const user = await GoatTapSDK.getInstance().getUserControl().getOne(accountStore.account!.id);
        accountStore.account = user as IUserResponse;
      } catch (error: any) {
        gameStore.messageQueue.push({
          children: "refetch balance failed",
          variant: "error",
        })
      }
    }
  }

  return {
    renewEnergy,
    buyBooster,
    refetchBalance,
    resetConnectionState,
    handleAutoBoot,
    wallet,
    connectionState,
    refetch
  };
}

export const runBooster = (botAddress: string, isTestnet?: boolean) => {
  const { accountStore, gameStore, boostStore } = useGoatTapStore();

  const { handleAutoBoot, wallet, connectionState, refetch } = useBooster(botAddress, isTestnet);


  useEffect(() => {
    if (boostStore.isConnectingWallet && wallet?.account) {
      gameStore.modalShowing = ModalId.walletConnected;
      handleAutoBoot();
      boostStore.isConnectingWallet = false;
    }
  }, [wallet?.account, boostStore.isConnectingWallet]);

  useEffect(() => {
    if (connectionState === ConnectionState.RequestSent) {
      gameStore.modalShowing = ModalId.autoBootWasSent;
      boostStore.buying = false;
    }
  }, [connectionState])

  useEffect(() => {
    if (accountStore.account?.id) {
      refetch();
    }
  }, [accountStore.account?.id])
}