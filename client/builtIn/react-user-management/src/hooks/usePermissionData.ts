import { useEffect, useMemo, useState } from "react"
import { useForm } from "@core-ui/react-hooks-form";
import { Permission, makePermissionSchema } from "../schemas";
import { PermissionsActionType, PermissionsContext } from "../context";
import UserManagementSDK, { Pagination, PermissionResponse } from "@core-sdk/user-management";
import { DrawerActionType, DrawerContext } from "@core-ui/react-drawer";
import { IRecord } from "@core-ui/react-table";

export const usePermissionData = () => {
  const [loading, setLoading] = useState(false);

  const drawerDispatch = DrawerContext.useDataDispatchContext();

  const permissionData = PermissionsContext.useDataContext();
  const permissionDispatch = PermissionsContext.useDataDispatchContext();

  const form = useForm<Permission>();

  const permissionSchema = useMemo(() => {
    return makePermissionSchema({
      initialValues: permissionData?.permission,
    });
  }, [permissionData?.permission]);

  const getPermission = async () => {
    permissionDispatch && permissionDispatch({
      type: PermissionsActionType.UPDATE_PERMISSION,
      payload: {}
    })
  }

  const setDetailData = async (record: PermissionResponse & IRecord) => {
    permissionDispatch && permissionDispatch({
      type: PermissionsActionType.UPDATE_PERMISSION,
      payload: { permission: record as PermissionResponse }
    })
  }

  const setEditMode = async (value: boolean) => {
    permissionDispatch && permissionDispatch({
      type: PermissionsActionType.UPDATE_EDIT_MODE,
      payload: { isEdit: value }
    })
  }

  const getPermissions = async () => {
    try {
      const permissionResponse: Pagination<PermissionResponse> =
        (await UserManagementSDK.getInstance()
          .getPermissionControl()
          .getMany({})) as Pagination<PermissionResponse>;
      permissionDispatch &&
        permissionDispatch({
          type: PermissionsActionType.UPDATE_PERMISSIONS,
          payload: { permissions: permissionResponse.data },
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

  const onCreatePermission = async (dataSubmit: Permission) => {
    await UserManagementSDK.getInstance().getPermissionControl().create({
      name: dataSubmit.name,
      description: dataSubmit.description,
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
    getPermissions();
  };

  const onUpdatePermission = async (dataSubmit: Permission) => {
    if (!permissionData?.permission?.id) return;
    await UserManagementSDK.getInstance().getPermissionControl().update(permissionData?.permission?.id, {
      name: dataSubmit.name,
      description: dataSubmit.description,
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
    getPermissions();
  };

  return {
    onCreatePermission,
    onUpdatePermission,
    loading,
    form,
    permissionSchema,
    permissionData,
    setDetailData,
    setEditMode
  }
};
