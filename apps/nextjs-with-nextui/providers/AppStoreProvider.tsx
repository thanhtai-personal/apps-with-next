"use client";

import { appStore } from "@/store";
import { ReactNode } from "react";

const AppProvider = appStore.Provider;

export const AppStoreProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {

  return (
    <AppProvider>
      {children}
    </AppProvider>
  )
}