"use client";

import { createStore } from "@core-utils/react-mobx-state";
import { UIStore } from "./UIStore";
import { ReactNode } from "react";

export class AppStore {
  public uiStore: UIStore;

  public constructor() {
    this.uiStore = new UIStore();
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
