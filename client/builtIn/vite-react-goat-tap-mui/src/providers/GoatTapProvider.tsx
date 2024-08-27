import { observer } from "@core-ui/react-mobx-state";
import { ReactNode, useLayoutEffect } from "react";
import { GoatTapStoreInjector, GoatTapStore } from "../store/store";

export var useStore: () => GoatTapStore = window.useStore;

export const GoatTapProvider = observer(({ children, config }: {
  children: ReactNode;
  config: any;
}) => {

  useLayoutEffect(() => {
    const featureStore = GoatTapStoreInjector.getInstance(config.useStore);
    const _useStore = featureStore.getUseStore();
    if (_useStore) {
      useStore = _useStore;
    }
  }, [config])

  return children
})