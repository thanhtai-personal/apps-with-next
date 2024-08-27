import { createMobxContext } from "./Provider";

export const createStore = <StoreDataType>(initialData) => {
  const store = createMobxContext<StoreDataType>(initialData);

  return {
    useStore: store.getUseStore(),
    Provider: store.MobxProvider
  }
}