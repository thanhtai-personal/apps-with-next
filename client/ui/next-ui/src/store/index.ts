import { createStore } from "@core-utils/react-mobx-state";
import { ThemeStore } from "./ThemeStore";

export class NextUIStore {
  public themeStore: ThemeStore;

  public constructor() {
    this.themeStore = new ThemeStore();
  }
}

export const appStore = createStore<NextUIStore>(new NextUIStore());

export const useNextUIStore = appStore.useStore as () => NextUIStore;
export const NextUIStoreProvider = appStore.Provider;
