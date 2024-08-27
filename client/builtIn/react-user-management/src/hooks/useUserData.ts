import { useEffect, useMemo, useState } from "react"
import { useForm } from "@core-ui/react-hooks-form";
import { User, makeUserSchema } from "../schemas";
import { UsersActionType, UsersContext } from "../context";
import UserManagementSDK, { Pagination, UserResponse } from "@core-sdk/user-management";
import { DrawerActionType, DrawerContext } from "@core-ui/react-drawer";
import { IRecord } from "@core-ui/react-table";

export const useUserData = () => {
  const [loading, setLoading] = useState(false);

  const drawerDispatch = DrawerContext.useDataDispatchContext();

  const userData = UsersContext.useDataContext();
  const userDispatch = UsersContext.useDataDispatchContext();

  const form = useForm<User>();

  const userSchema = useMemo(() => {
    return makeUserSchema({
      roleList: (userData?.roles || []).map((item) => ({
        label: item.name,
        key: item.id,
      })),
      initialValues: (userData?.user || {}) as User,
    });
  }, [userData?.roles, userData?.user]);

  const getUser = async () => {
    userDispatch && userDispatch({
      type: UsersActionType.UPDATE_USER,
      payload: {}
    })
  }

  const setDetailData = async (record: UserResponse & IRecord) => {
    userDispatch && userDispatch({
      type: UsersActionType.UPDATE_USER,
      payload: { user: record as UserResponse }
    })
  }

  const setEditMode = async (value: boolean) => {
    userDispatch && userDispatch({
      type: UsersActionType.UPDATE_EDIT_MODE,
      payload: { isEdit: value }
    })
  }

  const getUsers = async () => {
    try {
      const userResponse: Pagination<UserResponse> =
        (await UserManagementSDK.getInstance()
          .getUserControl()
          .getMany({})) as Pagination<UserResponse>;
      userDispatch &&
        userDispatch({
          type: UsersActionType.UPDATE_USERS,
          payload: { users: userResponse.data },
        });
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getUser();
      setLoading(false);
    })();
  }, []);

  const onCreateUser = async (dataSubmit: User) => {
    await UserManagementSDK.getInstance().getUserControl().create({
      email: dataSubmit.email,
      firstName: dataSubmit.firstName,
      lastName: dataSubmit.lastName,
      password: dataSubmit.password,
      status: "registered",
      roles: dataSubmit.roles
    })
    form.reset();
    form.setValue("firstName", "")
    form.setValue("lastName", "")
    form.setValue("email", "")
    form.setValue("roles", [])
    drawerDispatch && drawerDispatch({
      type: DrawerActionType.CLOSE,
      payload: {
        position: "right"
      }
    })
    getUsers();
  };

  const onUpdateUser = async (dataSubmit: User) => {
    if (!userData?.user?.id) return;
    await UserManagementSDK.getInstance().getUserControl().update(userData?.user?.id, {
      email: dataSubmit.email,
      firstName: dataSubmit.firstName,
      lastName: dataSubmit.lastName,
      password: dataSubmit.password,
    })
    form.reset();
    form.setValue("firstName", "")
    form.setValue("lastName", "")
    form.setValue("email", "")
    form.setValue("roles", [])
    drawerDispatch && drawerDispatch({
      type: DrawerActionType.CLOSE,
      payload: {
        position: "right"
      }
    })
    getUsers();
  };

  return {
    onCreateUser,
    loading,
    form,
    userSchema,
    userData,
    setDetailData,
    setEditMode,
    onUpdateUser
  }
};
