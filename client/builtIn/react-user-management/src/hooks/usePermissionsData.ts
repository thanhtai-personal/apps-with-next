import { ReactNode, useEffect, useState } from "react"
import {
  DrawerActionType,
  DrawerContext,
} from "@core-ui/react-drawer";
import { PermissionsActionType, PermissionsContext } from "../context";
import UserManagementSDK, {
  PermissionResponse,
  Pagination,
} from "@core-sdk/user-management";

export const permissionColumns = [
  {
    name: "name",
    label: "Name",
  },
  {
    name: "description",
    label: "Description",
  },
];

export const usePermissionsData = (title: ReactNode) => {
  const [loading, setLoading] = useState(false);

  const permissionData = PermissionsContext.useDataContext();

  const permissionDispatch = PermissionsContext.useDataDispatchContext();
  const drawerDispatch = DrawerContext.useDataDispatchContext();

  const onFilter = () => { };

  const handleOpenCreationModal = () => {
    if (drawerDispatch) {
      drawerDispatch({
        type: DrawerActionType.INIT_STATE,
        payload: {
          title: title,
        },
      });
      drawerDispatch({
        type: DrawerActionType.OPEN,
        payload: {
          position: "right",
        },
      });
    }
  };

  const handleOpenDetailModal = (_tille: ReactNode) => {
    if (drawerDispatch) {
      drawerDispatch({
        type: DrawerActionType.INIT_STATE,
        payload: {
          title: _tille,
        },
      });
      drawerDispatch({
        type: DrawerActionType.OPEN,
        payload: {
          position: "right",
        },
      });
    }
  };

  const handleCloseDrawer = () => {
    if (drawerDispatch) {
      drawerDispatch({
        type: DrawerActionType.CLOSE,
        payload: {
          position: "right",
        },
      });
    }
  };

  const getPermission = async () => {
    try {
      const permissionResponse: Pagination<PermissionResponse> =
        (await UserManagementSDK.getInstance()
          .getPermissionControl()
          .getMany({})) as Pagination<PermissionResponse>;
      permissionDispatch &&
        permissionDispatch({
          type: PermissionsActionType.UPDATE_PERMISSIONS,
          payload: { permissions: permissionResponse.data, total: permissionResponse.total },
        });
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getPermission();
      setLoading(false);
    })();
  }, []);

  return {
    loading,
    drawer: {
      close: handleCloseDrawer,
      open: handleOpenCreationModal,
      openDetail: handleOpenDetailModal,
    },
    onFilter,
    permissionData
  }
};
