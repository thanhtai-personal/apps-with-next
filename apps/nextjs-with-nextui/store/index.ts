"use client";

import { ReactNode } from "react";
import { createStore } from "@core-utils/react-mobx-state";
import { UIStore } from "./UIStore";
import { CountingStore } from "./CountingStore";

export class AppStore {
  public uiStore: UIStore;
  public counterStore: CountingStore;

  public constructor() {
    this.uiStore = new UIStore();
    this.counterStore = new CountingStore();
  }
}

export const appStore: {
  useStore: () => unknown;
  Provider: ({ children }: {
    children: ReactNode;
  }) => ReactNode;
} = createStore<AppStore>(new AppStore()) as {
  useStore: () => unknown;
  Provider: ({ children }: {
    children: ReactNode;
  }) => ReactNode;
};
