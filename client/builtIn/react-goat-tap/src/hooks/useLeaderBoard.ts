import { useEffect, useMemo } from "react"
import { useGoatTapStore } from "../store"
import { useFamousPeople } from "./useFamousPeople";

export const useLeaderBoard = () => {

  const { accountStore, gameStore } = useGoatTapStore();

  const refetch = async () => {

  }

  useEffect(() => {
    if (accountStore.account) {
      refetch();
    }
  }, [accountStore.account])

  useFamousPeople();

  const topGoats = useMemo(() => {
    return gameStore.famousPeople ? gameStore.famousPeople.filter((_, index) => index < 10) : []
  }, [gameStore.famousPeople])

  return {
    topGoats
  }
}