import { useEffect } from "react";
import { AppcenterSDK } from "@core-sdk/app-center";
import { IPagingResponse } from "@core-ui/common-types";
import { IPermissionResponse } from "@core-ui/ums-types";
import { useUMSStore } from "../store";

export const usePermissionsData = () => {
  const { permissionStore, notiStore } = useUMSStore();

  const refetch = async () => {
    try {
      permissionStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getPermissionControl?.().getMany?.((permissionStore.filterData || {}) as IPagingResponse<IPermissionResponse>);
      permissionStore.permissions = response;
    } catch (error) { } finally {
      permissionStore.loading = false;
    }
  }

  const searchPermissions = async (filter = {}) => {
    try {
      permissionStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getPermissionControl?.().getMany?.({ ...(permissionStore.filterData || {}), ...filter } as IPagingResponse<IPermissionResponse>);
      permissionStore.permissions = response;
    } catch (error) { } finally {
      permissionStore.loading = false;
    }
  }

  const getPermissionDetail = async (id: string | number) => {
    try {
      permissionStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getPermissionControl?.().getOne?.(id);
      permissionStore.permission = response;
    } catch (error) { } finally {
      permissionStore.loading = false;
    }
  }

  const deletePermission = async (id: string | number) => {
    try {
      permissionStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getPermissionControl?.().delete?.(id);
      notiStore.messageQueue = [...(notiStore.messageQueue || []), {
        children: "Delete Success",
        variant: "success"
      }]
      await refetch();
    } catch (error) {
      notiStore.messageQueue = [...(notiStore.messageQueue || []), {
        children: "Delete failed",
        variant: "error"
      }]
    } finally {
      permissionStore.loading = false;
    }
  }

  const viewPermission = (permission: any) => {
    permissionStore.permission = permission;
  }

  return {
    refetch,
    deletePermission,
    searchPermissions,
    getPermissionDetail,
    viewPermission,
  }
}

export const runPermissions = () => {
  const { refetch } = usePermissionsData();

  useEffect(() => {
    refetch();
  }, []);

  return {}
}