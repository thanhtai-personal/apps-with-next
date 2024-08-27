import { ReactNode } from "react";
import { useStore } from "../store";
import { observer } from "@core-ui/react-mobx-state";
import { Header } from "./Header";
import { ThemeProvider } from "@/styles/ThemeProvider";
import { GoatTapProvider } from "@core-ui/react-goat-tap";
import { apiConfig } from "@/api/index";

export const AppLayout = observer(({ children }: { children: ReactNode }) => {
  const { uiStore } = useStore();

  return (
    <GoatTapProvider config={{
      apiConfig,
      isTestNet: import.meta.env.VITE_IS_TEST_NET,
      tonConfig: {
        manifestUrl: `${import.meta.env.VITE_BASE_URL}/tonconnect-manifest.json`,
        // update after deployment
        // manifestUrl: `https://goat-tap.decentrust.io/tonconnect-manifest.json`,
        twaReturnUrl: `${import.meta.env.VITE_TELEGRAM_APP_URL}?startapp=telegram_wallet_connect`,
      }
    }}>
      <ThemeProvider>
        {uiStore.useHeader && <Header />}
        {children}
      </ThemeProvider>
    </GoatTapProvider>
  )
})