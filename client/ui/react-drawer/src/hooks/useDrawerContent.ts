import { DrawerActionType, DrawerContext, Position } from "../context";

export const useDrawerContent = () => {
  const drawerData = DrawerContext.useDataContext();
  const drawerDispatcher = DrawerContext.useDataDispatchContext();

  const close = (position: Position) => () => {
    drawerDispatcher &&
      drawerDispatcher({
        type: DrawerActionType.CLOSE,
        payload: {
          position,
        },
      });
  };

  return { close, drawerData }
  
};
