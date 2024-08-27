import { createStore } from "@core-ui/react-mobx-state";
import UIStore from "./UIStore";

export class AppStore {
  public uiStore: UIStore;

  public constructor() {
    this.uiStore = new UIStore();
  }
}

export const appStore = createStore<AppStore>(new AppStore());

export const useStore = appStore.useStore as () => AppStore;
export const AppStoreProvider = appStore.Provider;