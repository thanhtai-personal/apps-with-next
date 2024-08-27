import { ReactApplicationManager } from "@core-ui/react-core";
import { MobxInstance, createMobxContext } from "./Provider";

export class ReactMobxStateManager<StoreDataType> {
  private static instance: ReactMobxStateManager<any> & {
    inject: (applicationManager: ReactApplicationManager) => ReactApplicationManager;
  } | null = null;
  public store: MobxInstance<StoreDataType> | null = null;

  constructor(initialStore: StoreDataType) {
    this.store = createMobxContext<StoreDataType>(initialStore);
  }

  public static getInstance = <StoreDataType,>(initialStore: StoreDataType) => {
    if (!this.instance) {
      this.instance = new ReactMobxStateManager<StoreDataType>(initialStore)
    }
    return this.instance;
  }

  inject = (applicationManager: ReactApplicationManager) => {
    if (this.store) {
      applicationManager.addProvider(this.store.MobxProvider)
    }
    return applicationManager;
  }

  getUseStore = () => {
    if (!this.store) {
      console.error("Store was not initialized")
      return null;
    }
    return this.store.getUseStore();
  };
}

export const injectStore = <StoreDataType,>(applicationManager: ReactApplicationManager, initialStore: StoreDataType) => {
  const store = createMobxContext<StoreDataType>(initialStore);
  if (store) {
    applicationManager.addProvider(store.MobxProvider)
  }
  window.useStore = store.getUseStore();
  return applicationManager;
}
