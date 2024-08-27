import { useEffect, useMemo, useState } from "react"
import { useForm } from "@core-ui/react-hooks-form";
import { Role, makeRoleSchema } from "../schemas";
import { RolesActionType, RolesContext } from "../context";
import UserManagementSDK, { Pagination, RoleResponse } from "@core-sdk/user-management";
import { DrawerActionType, DrawerContext } from "@core-ui/react-drawer";
import { IRecord } from "@core-ui/react-table";

export const useRoleData = () => {
  const [loading, setLoading] = useState(false);

  const drawerDispatch = DrawerContext.useDataDispatchContext();

  const roleData = RolesContext.useDataContext();
  const roleDispatch = RolesContext.useDataDispatchContext();

  const form = useForm<Role>();

  const roleSchema = useMemo(() => {
    return makeRoleSchema({
      initialValues: (roleData?.role || {}) as Role,
      permissionList: roleData?.permissions?.map((item) => ({
        key: item.id,
        label: item.name
      }))
    });
  }, [roleData?.role, roleData?.permissions]);

  const getRole = async () => {
    roleDispatch && roleDispatch({
      type: RolesActionType.UPDATE_ROLE,
      payload: {}
    })
  }

  const setDetailData = async (record: RoleResponse & IRecord) => {
    roleDispatch && roleDispatch({
      type: RolesActionType.UPDATE_ROLE,
      payload: { role: record as RoleResponse }
    })
  }

  const setEditMode = async (value: boolean) => {
    roleDispatch && roleDispatch({
      type: RolesActionType.UPDATE_EDIT_MODE,
      payload: { isEdit: value }
    })
  }

  const getRoles = async () => {
    try {
      const rolesResponse: Pagination<RoleResponse> =
        (await UserManagementSDK.getInstance()
          .getRoleControl()
          .getMany({})) as Pagination<RoleResponse>;
      roleDispatch &&
        roleDispatch({
          type: RolesActionType.UPDATE_ROLES,
          payload: { roles: rolesResponse.data },
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
  }, []);

  const onCreateRole = async (dataSubmit: Role) => {
    await UserManagementSDK.getInstance().getRoleControl().create({
      name: dataSubmit.name,
      description: dataSubmit.description,
      permissions: dataSubmit.permissions,
    })
    form.reset();
    form.setValue("name", "")
    form.setValue("description", "")
    drawerDispatch && drawerDispatch({
      type: DrawerActionType.CLOSE,
      payload: {
        position: "right"
      }
    })
    getRoles();
  };

  const onUpdateRole = async (dataSubmit: Role) => {
    if (!roleData?.role?.id) return
    await UserManagementSDK.getInstance().getRoleControl().update(roleData?.role?.id, {
      name: dataSubmit.name,
      description: dataSubmit.description,
      permissions: dataSubmit.permissions,
    })
    form.reset();
    form.setValue("name", "")
    form.setValue("description", "")
    drawerDispatch && drawerDispatch({
      type: DrawerActionType.CLOSE,
      payload: {
        position: "right"
      }
    })
    getRoles();
  };

  return {
    onCreateRole,
    onUpdateRole,
    loading,
    form,
    roleSchema,
    roleData,
    setDetailData,
    setEditMode,
  }
};
