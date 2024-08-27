import { ReactNode, createContext, useContext } from "react";

export interface MobxInstance<_StoreDataType> {
  MobxProvider: ({ children }: { children: ReactNode }) => ReactNode;
  getUseStore: <StoreDataType>() => ((() => StoreDataType));
}

export const createMobxContext = <StoreDataType,>(initialData: StoreDataType) => {
  const RootStoreContext = createContext<null | StoreDataType>(null);

  const useStore = () => {
    const store = useContext(RootStoreContext);
    if (store === null) {
      throw new Error("Store cannot be null, please add a context provider");
    }
    return store;
  }

  const MobxProvider = ({ children }: { children: ReactNode }) => {
    return (
      <RootStoreContext.Provider value={initialData}>
        {children}
      </RootStoreContext.Provider>
    )
  }

  return {
    getUseStore: () => useStore,
    MobxProvider,
  } as MobxInstance<StoreDataType>;
}