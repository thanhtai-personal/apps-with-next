import { useGoatTapStore } from "../store"
import GoatTapSDK from "@core-sdk/goat-tap"
import { IUserResponse } from "@core-ui/goat-tap-types";

export const usePickGoat = () => {
  const { accountStore, gameStore } = useGoatTapStore();

  const updateFamousPerson = async (id: number) => {
    if (!accountStore.account || !id) return;
    try {
      const user = await GoatTapSDK.getInstance().updateGoat(accountStore.account.id, id);
      accountStore.account = user as IUserResponse;
      gameStore.messageQueue = [...(gameStore.messageQueue || []), {
        children: "Update goat success!",
        variant: "success",
      }]
    } catch (error) {
      gameStore.messageQueue = [...(gameStore.messageQueue || []), {
        children: "Update goat failed!",
        variant: "error",
      }]
    }
  }

  return {
    updateFamousPerson
  };
}