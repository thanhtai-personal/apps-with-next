import { useEffect } from "react";
import { DrawerContext, DrawerActionType, IDrawerContext } from "../context";


export const useDrawerLayout = (config: IDrawerContext) => {
  const drawerDispatch = DrawerContext.useDataDispatchContext();

  useEffect(() => {
    drawerDispatch &&
      drawerDispatch({
        type: DrawerActionType.INIT_STATE,
        payload: {
          ...config,
        },
      });
  }, [config]);
};
