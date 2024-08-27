import { ReactNode } from "react";
import { useStore } from "../store";
import { observer } from "@core-ui/react-mobx-state";
import { Header } from "./Header";
import { ThemeProvider } from "@/styles/ThemeProvider";

export const AppLayout = observer(({ children }: { children: ReactNode }) => {
  const { uiStore } = useStore();

  return (
    <ThemeProvider>
      {uiStore.useHeader && <Header />}
      {children}
    </ThemeProvider>
  )
})