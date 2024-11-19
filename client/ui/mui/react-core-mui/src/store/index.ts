import { createStore } from "@core-ui/react-mobx-state";
import { ThemeStore } from "./ThemeStore";

export class MuiCoreStore {
  public themeStore: ThemeStore;

  public constructor() {
    this.themeStore = new ThemeStore();
  }
}

export const muiCoreStore = createStore<MuiCoreStore>(new MuiCoreStore());

export const useMuiCoreStore = muiCoreStore.useStore as () => MuiCoreStore;
export const MuiCoreStoreProvider = muiCoreStore.Provider;