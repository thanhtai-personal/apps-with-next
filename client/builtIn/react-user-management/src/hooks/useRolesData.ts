import { ReactNode, useEffect, useState } from "react"
import {
  DrawerActionType,
  DrawerContext,
} from "@core-ui/react-drawer";
import { RolesActionType, RolesContext } from "../context";
import UserManagementSDK, {
  RoleResponse,
  Pagination,
  PermissionResponse,
} from "@core-sdk/user-management";

export const roleColumns = [
  {
    name: "name",
    label: "Name",
  },
  {
    name: "description",
    label: "Description",
  },
  {
    name: "permissions",
    label: "Permissions",
  },
];

export const useRolesData = (title: ReactNode) => {
  const [loading, setLoading] = useState(false);

  const roleData = RolesContext.useDataContext();

  const roleDispatch = RolesContext.useDataDispatchContext();
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

  const getRole = async () => {
    try {
      const roleResponse: Pagination<RoleResponse> =
        (await UserManagementSDK.getInstance()
          .getRoleControl()
          .getMany({})) as Pagination<RoleResponse>;
      roleDispatch &&
        roleDispatch({
          type: RolesActionType.UPDATE_ROLES,
          payload: { roles: roleResponse.data },
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const getPermissions = async () => {
    try {
      const permissionResponse: Pagination<PermissionResponse> =
        (await UserManagementSDK.getInstance()
          .getPermissionControl()
          .getMany({})) as Pagination<PermissionResponse>;
      roleDispatch &&
        roleDispatch({
          type: RolesActionType.UPDATE_PERMISSIONS,
          payload: { permissions: permissionResponse.data, total: permissionResponse.total },
        });
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getRole();
      setLoading(false);
    })();
    (async () => {
      await getPermissions();
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
    roleData
  }
};
