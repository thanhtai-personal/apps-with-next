import { useEffect } from "react";
import { AppcenterSDK } from "@core-sdk/app-center";
import { IPagingResponse } from "@core-ui/common-types";
import { INovelResponse } from "@core-ui/novels-types";
import { useNovelsStore } from "../store";

export const useNovelsData = () => {
  const { novelStore, notiStore } = useNovelsStore();

  const refetch = async () => {
    try {
      novelStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getNovelControl?.().getMany?.((novelStore.filterData || {}) as IPagingResponse<INovelResponse>);
      novelStore.novels = response;
    } catch (error) { } finally {
      novelStore.loading = false;
    }
  }

  const searchNovels = async (filter = {}) => {
    try {
      novelStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getNovelControl?.().getMany?.({ ...(novelStore.filterData || {}), ...filter } as IPagingResponse<INovelResponse>);
      novelStore.novels = response;
    } catch (error) { } finally {
      novelStore.loading = false;
    }
  }

  const getNovelDetail = async (id: string | number) => {
    try {
      novelStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getNovelControl?.().getOne?.(id);
      novelStore.novel = response;
    } catch (error) { } finally {
      novelStore.loading = false;
    }
  }

  const deleteNovel = async (id: string | number) => {
    try {
      novelStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getNovelControl?.().delete?.(id);
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
      novelStore.loading = false;
    }
  }

  const viewNovel = (novel: any) => {
    novelStore.novel = novel;
  }

  return {
    refetch,
    deleteNovel,
    searchNovels,
    getNovelDetail,
    viewNovel,
  }
}

export const runNovels = () => {
  const { refetch } = useNovelsData();

  useEffect(() => {
    refetch();
  }, []);

  return {}
}