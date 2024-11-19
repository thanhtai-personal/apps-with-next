import { useEffect } from "react";
import { AppcenterSDK } from "@core-sdk/app-center";
import { IPagingResponse } from "@core-ui/common-types";
import { IAuthorResponse } from "@core-ui/novels-types";
import { useNovelsStore } from "../store";

export const useAuthorsData = () => {
  const { authorStore, notiStore } = useNovelsStore();

  const refetch = async () => {
    try {
      authorStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getAuthorControl?.().getMany?.((authorStore.filterData || {}) as IPagingResponse<IAuthorResponse>);
      authorStore.authors = response;
    } catch (error) { } finally {
      authorStore.loading = false;
    }
  }

  const searchAuthors = async (filter = {}) => {
    try {
      authorStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getAuthorControl?.().getMany?.({ ...(authorStore.filterData || {}), ...filter } as IPagingResponse<IAuthorResponse>);
      authorStore.authors = response;
    } catch (error) { } finally {
      authorStore.loading = false;
    }
  }

  const getAuthorDetail = async (id: string | number) => {
    try {
      authorStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getAuthorControl?.().getOne?.(id);
      authorStore.author = response;
    } catch (error) { } finally {
      authorStore.loading = false;
    }
  }

  const deleteAuthor = async (id: string | number) => {
    try {
      authorStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getAuthorControl?.().delete?.(id);
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
      authorStore.loading = false;
    }
  }

  const viewAuthor = (author: any) => {
    authorStore.author = author;
  }

  return {
    refetch,
    deleteAuthor,
    searchAuthors,
    getAuthorDetail,
    viewAuthor,
  }
}

export const runAuthors = () => {
  const { refetch } = useAuthorsData();

  useEffect(() => {
    refetch();
  }, []);

  return {}
}