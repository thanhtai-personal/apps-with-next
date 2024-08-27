import { ReactNode, useEffect, useState } from "react"
import {
  DrawerActionType,
  DrawerContext,
} from "@core-ui/react-drawer";
import { UsersActionType, UsersContext } from "../context";
import UserManagementSDK, {
  UserResponse,
  Pagination,
  RoleResponse,
  UserFilter,
} from "@core-sdk/user-management";
import { IPagingState } from "@core-ui/react-table";

export const userColumns = [
  {
    name: "firstName",
    label: "First name",
  },
  {
    name: "lastName",
    label: "Last name",
  },
  {
    name: "email",
    label: "Email",
  },
  {
    name: "status",
    label: "Status",
  },
  {
    name: "role",
    label: "Role",
  },
];

export const useUsersData = (title: ReactNode) => {
  const [loading, setLoading] = useState(false);

  const userData = UsersContext.useDataContext();

  const userDispatch = UsersContext.useDataDispatchContext();
  const drawerDispatch = DrawerContext.useDataDispatchContext();

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

  const getUsers = async (filterParams?: UserFilter) => {
    try {
      const userResponse: Pagination<UserResponse> =
        (await UserManagementSDK.getInstance()
          .getUserControl()
          .getMany(filterParams || {})) as Pagination<UserResponse>;
      userDispatch &&
        userDispatch({
          type: UsersActionType.UPDATE_USERS,
          payload: { users: userResponse.data, total: userResponse.total },
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const getRoles = async () => {
    try {
      const roleResponse: Pagination<RoleResponse> =
        (await UserManagementSDK.getInstance()
          .getRoleControl()
          .getMany({})) as Pagination<RoleResponse>;
      userDispatch &&
        userDispatch({
          type: UsersActionType.UPDATE_ROLES,
          payload: { roles: roleResponse.data },
        });
    } catch (error) {
      setLoading(false);
    }
  };


  const onFilter = ({
    sortValues,
    pagination
  }: {
    sortValues?: string[];
    pagination?: IPagingState;
  }) => {
    getUsers({
      limit: pagination?.limit || 10,
      offset: pagination?.offset || 0,
      sortBy: sortValues,
    })
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getUsers();
      setLoading(false);
    })();
    (async () => {
      await getRoles();
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
    userData,
  }
};
