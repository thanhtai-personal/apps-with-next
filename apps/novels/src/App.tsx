import { ReactNode } from "react";
import { AppLayout } from "@/layout/index"
import "./reset.css";
import "./index.css";
import { AppStoreProvider } from "./store";

export const App = ({ children }: { children: ReactNode }) => {
  return (
    <AppStoreProvider>
      <AppLayout>
        {children}
      </AppLayout>
    </AppStoreProvider>
  )
};
