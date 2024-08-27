import GoatTapSDK from "@core-sdk/goat-tap";
import { useEffect } from "react";
import { useGoatTapStore } from "../store";

export const useFamousPeople = () => {
  const { gameStore } = useGoatTapStore();

  const refetch = async () => {
    try {
      gameStore.famousPeopleLoading = true;
      const famousPeopleRs: any = await GoatTapSDK.getInstance().getFamousPeopleControl().getMany({
        offset: gameStore.famousPeoplePaging.skip,
        limit: gameStore.famousPeoplePaging.limit,
        name: gameStore.famousPeopleFilter.name
      });
      gameStore.famousPeople = famousPeopleRs.data;
      gameStore.famousPeoplePaging.total = famousPeopleRs.total;
    } catch (error) { }
    finally {
      gameStore.famousPeopleLoading = false;
    }
  }

  useEffect(() => {
    refetch();
  }, [gameStore.famousPeoplePaging.limit, gameStore.famousPeoplePaging.offset, gameStore.famousPeopleFilter]);

  useEffect(() => {
    return () => {
      gameStore.famousPeoplePaging = {
        total: 0,
        offset: 0,
        limit: 10,
      }
      gameStore.famousPeopleFilter = {}
    }
  }, [])
}