import { useEffect, useMemo, useRef } from "react";
import { BoostType, useGoatTapStore } from "../store"
import GoatTapSDK from "@core-sdk/goat-tap";
import { IUserResponse } from "@core-ui/goat-tap-types";
import { useDebounce, useInterval } from "@core-utils/utils-helpers";
import { useLocalObservable } from "@core-ui/react-mobx-state";

const timeRefetch = 10000
const timeDelaySyncTap = 800
const MAX_TAP_PER_SECONDS = 10;
const botInterval = 1000;
const regenInterval = 10000;

export const useTap = (_botWallet: string) => {
  const { tapStore, accountStore, gameStore } = useGoatTapStore();
  const timeClick = useRef<any>();
  
  const refetchTapData = async () => {
    try {
      if (Date.now() - timeClick.current > 5000 || !timeClick.current) {
        syncTap();
      } else {
        // else here because sync did it already.
        const newTapData: any = await GoatTapSDK.getInstance().getTapData();
        tapStore.groupPoints = newTapData.data?.groupPoints || 0;
        tapStore.famousPeople = newTapData.data?.famousPerson;
      }
    } catch (error) { }
  }

  const increasePoints = useMemo(() => {
    if ((accountStore.account?.energy || 0) <= 0) return 0;
    if (accountStore.account?.boosts) {
      return accountStore.account?.boosts.reduce((prev, current) => prev + Number(current.pointsPerTap), 0) || 1
    }
    return 1;
  }, [accountStore.account?.boosts, accountStore.account?.energy])

  const syncTap = async () => {
    if (Number(tapStore.energy) > 0 && !!accountStore.account?.id) {
      try {
        let user = await GoatTapSDK.getInstance().updateEnergy(accountStore.account!.id, tapStore.unsyncEnergy || 0) as IUserResponse;
        user = await GoatTapSDK.getInstance().updatePoints(accountStore.account.id, tapStore.unsyncPoints) as IUserResponse;

        const newTapData: any = await GoatTapSDK.getInstance().getTapData();
        tapStore.groupPoints = newTapData.data?.groupPoints || 0;
        tapStore.famousPeople = newTapData.data?.famousPerson;
        tapStore.unsyncEnergy = 0;
        tapStore.unsyncPoints = 0;

        if (user.id) {
          accountStore.account = user as IUserResponse;
        }
      } catch (error: any) {
        gameStore.messageQueue.push({
          children: error?.message || "Tap error",
          variant: "error",
        })
      }
    }
  }

  const debounceSyncTap = useDebounce(syncTap, timeDelaySyncTap)

  const tap = () => {
    const rangeClickTime = Date.now() - (timeClick.current || 0);
    if (rangeClickTime < 1000 / MAX_TAP_PER_SECONDS) return;
    tapStore.unsyncEnergy = tapStore.unsyncEnergy - 1;
    tapStore.unsyncPoints = Number(tapStore.unsyncPoints) + Number(increasePoints);
    if (accountStore.account) {
      debounceSyncTap();
    }
    timeClick.current = Date.now();
  }

  return {
    tap,
    increasePoints,
    syncTap,
    refetchTapData
  };
}

export const runTap = (_botWallet: string) => {
  const { tapStore, accountStore } = useGoatTapStore();
  const state: { autoBoostExpired?: Date } = useLocalObservable(() => ({
    autoBoostExpired: undefined,
  }))

  const { syncTap, refetchTapData } = useTap(_botWallet);

  //fake energy
  useInterval(() => {
    // if (accountStore.account) {
    //   accountStore.account.energy = (accountStore.account?.energy || 0) + 1;
    // }
  }, regenInterval)


  useInterval(() => {
    // fake bot energy and points from auto boost
    if (state.autoBoostExpired && accountStore.account && accountStore.account.energy! > 0
      && new Date(state.autoBoostExpired) > new Date()
    ) {
      accountStore.account.energy = accountStore.account.energy! - 1;
      accountStore.account.points = Number(accountStore.account.points || 0) + 1;
      tapStore.groupPoints = Number(tapStore.groupPoints || 0) + 1;
    }
  }, botInterval)

  useEffect(() => {
    (async () => {
      if (accountStore.account?.id) {
        try {
          const user: IUserResponse = await GoatTapSDK.getInstance().getUserControl().getOne(accountStore.account!.id) as IUserResponse;
          state.autoBoostExpired = user?.boosts.find((item) => item.type === BoostType.AutoBoot)?.expiredAt
        } catch (error: any) { }
      }
    })()
  }, [accountStore.account?.id])


  useEffect(() => {
    return () => {
      syncTap();
    }
  }, []);

  useEffect(() => {
    if (accountStore.account?.id) {
      refetchTapData();
    }
  }, [accountStore.account?.id])

  useInterval(() => {
    refetchTapData();
  }, timeRefetch);
}