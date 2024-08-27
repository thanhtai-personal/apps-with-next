import { useNavigate } from "@core-ui/react-core";
import { useGoatTapStore } from "@core-ui/react-goat-tap";
import { useLayoutEffect } from "react";

export const useAuthenNavigate = (path: string) => {
  const navigate = useNavigate();
  const { accountStore } = useGoatTapStore();

  useLayoutEffect(() => {
    if (!!accountStore.account?.famousPerson && !!accountStore.account?.telegramInfo?.telegramId) {
      navigate(`${path}?telegramId=${accountStore.account.telegramInfo.telegramId}`);
    }
  }, [accountStore.account?.famousPerson, accountStore.account?.telegramInfo?.telegramId])

}