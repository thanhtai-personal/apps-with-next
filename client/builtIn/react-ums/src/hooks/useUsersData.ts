import { useEffect } from "react";
import { AppcenterSDK } from "@core-sdk/app-center";
import { IPagingResponse } from "@core-ui/common-types";
import { IUserResponse } from "@core-ui/ums-types";
import { useUMSStore } from "../store";

export const useUsersData = () => {
  const { userStore, notiStore } = useUMSStore();

  const refetch = async () => {
    try {
      userStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getUserControl?.().getMany?.((userStore.filterData || {}) as IPagingResponse<IUserResponse>);
      userStore.users = response;
    } catch (error) { } finally {
      userStore.loading = false;
    }
  }

  const searchUsers = async (filter = {}) => {
    try {
      userStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getUserControl?.().getMany?.({ ...(userStore.filterData || {}), ...filter } as IPagingResponse<IUserResponse>);
      userStore.users = response;
    } catch (error) { } finally {
      userStore.loading = false;
    }
  }

  const getUserDetail = async (id: string | number) => {
    try {
      userStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getUserControl?.().getOne?.(id);
      userStore.user = response;
    } catch (error) { } finally {
      userStore.loading = false;
    }
  }

  const deleteUser = async (id: string | number) => {
    try {
      userStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getUserControl?.().delete?.(id);
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
      userStore.loading = false;
    }
  }

  const viewUser = (user: any) => {
    userStore.user = user;
  }

  return {
    refetch,
    deleteUser,
    searchUsers,
    getUserDetail,
    viewUser,
  }
}

export const runUsers = () => {
  const { refetch } = useUsersData();

  useEffect(() => {
    refetch();
  }, []);

  return {}
}