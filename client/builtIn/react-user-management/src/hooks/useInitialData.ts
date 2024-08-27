import { useEffect } from "react";
import {
  UserManagementContext,
  IUserManagementContext,
  UserManagementActionType,
} from "../context";
import { ReactFormManager } from "@core-ui/react-hooks-form";
import { controls } from "@core-ui/react-auto-form-mantine";
import UserManagementSDK from "@core-sdk/user-management";

export const useInitialData = (config?: IUserManagementContext) => {
  const userManagementDispatcher =
    UserManagementContext.useDataDispatchContext();

  useEffect(() => {
    userManagementDispatcher &&
      userManagementDispatcher({
        type: UserManagementActionType.INIT_STATE,
        payload: { ...config },
      });
    ReactFormManager.getInstance().registerControls(controls)
    UserManagementSDK.getInstance(config?.apiConfig)
  }, [config]);
};
