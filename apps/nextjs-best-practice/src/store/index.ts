import { createStore } from "@core-ui/react-mobx-state";
import UIStore from "./UIStore";
import { NotifyStore } from "./NotifyStore";

export class AppStore {
  public uiStore: UIStore;
  public notiStore: NotifyStore;

  public constructor() {
    this.uiStore = new UIStore();
    this.notiStore = new NotifyStore();
  }
}

export const appStore = createStore<AppStore>(new AppStore());

export const useStore = appStore.useStore as () => AppStore;
export const AppStoreProvider = appStore.Provider;