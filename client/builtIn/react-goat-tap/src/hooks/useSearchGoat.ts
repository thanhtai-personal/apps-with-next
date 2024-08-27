import { useEffect, useMemo } from "react";
import { useGoatTapStore } from "../store";
import { useFamousPeople } from "./useFamousPeople";

export const useSearchGoat = () => {
  const { gameStore } = useGoatTapStore();

  useFamousPeople();

  useEffect(() => {
    gameStore.famousPeoplePaging = {
      limit: 10,
      offset: 0,
      total: 0,
    };
    return () => {
      gameStore.famousPeopleFilter.name = "";
      gameStore.famousPeoplePaging = {
        limit: 10,
        offset: 0,
        total: 0,
      };
      gameStore.famousPeople = [];
    }
  }, [])

  return {
    loadMore: {
      handler: () => {
        gameStore.famousPeoplePaging.limit = gameStore.famousPeoplePaging.limit + 10;
      },
      loading: gameStore.famousPeoplePaging
    }
  }

}