import { useEffect } from "react";
import { AppcenterSDK } from "@core-sdk/app-center";
import { IPagingResponse } from "@core-ui/common-types";
import { IRoleResponse } from "@core-ui/ums-types";
import { useUMSStore } from "../store";

export const useRolesData = () => {
  const { roleStore, notiStore } = useUMSStore();

  const refetch = async () => {
    try {
      roleStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getRoleControl?.().getMany?.((roleStore.filterData || {}) as IPagingResponse<IRoleResponse>);
      roleStore.roles = response;
    } catch (error) { } finally {
      roleStore.loading = false;
    }
  }

  const searchRoles = async (filter = {}) => {
    try {
      roleStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getRoleControl?.().getMany?.({ ...(roleStore.filterData || {}), ...filter } as IPagingResponse<IRoleResponse>);
      roleStore.roles = response;
    } catch (error) { } finally {
      roleStore.loading = false;
    }
  }

  const getRoleDetail = async (id: string | number) => {
    try {
      roleStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getRoleControl?.().getOne?.(id);
      roleStore.role = response;
    } catch (error) { } finally {
      roleStore.loading = false;
    }
  }

  const deleteRole = async (id: string | number) => {
    try {
      roleStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getRoleControl?.().delete?.(id);
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
      roleStore.loading = false;
    }
  }

  const viewRole = (role: any) => {
    roleStore.role = role;
  }

  return {
    refetch,
    deleteRole,
    searchRoles,
    getRoleDetail,
    viewRole,
  }
}

export const runRoles = () => {
  const { refetch } = useRolesData();

  useEffect(() => {
    refetch();
  }, []);

  return {}
}