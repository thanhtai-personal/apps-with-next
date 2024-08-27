import { ReactNode } from "react";
import { observer } from "@core-ui/react-mobx-state";
import { useDeviceDetection, useGoatTapStore, useTelegramAuthen } from "@core-ui/react-goat-tap";
import { LoadingPage } from "@/components/LoadingPage";

export const TelegramProvider = observer(({ children }: { children: ReactNode }) => {
  const { accountStore } = useGoatTapStore();
  const { isWindow, isChrome } = useDeviceDetection();

  useTelegramAuthen();

  if (accountStore.isLoading) {
    return <LoadingPage isStrongPlatform={isWindow || isChrome}/>
  }

  return children;
})