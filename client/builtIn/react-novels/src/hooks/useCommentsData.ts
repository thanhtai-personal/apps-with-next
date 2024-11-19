import { useEffect } from "react";
import { AppcenterSDK } from "@core-sdk/app-center";
import { IPagingResponse } from "@core-ui/common-types";
import { ICommentResponse } from "@core-ui/novels-types";
import { useNovelsStore } from "../store";

export const useCommentsData = () => {
  const { commentStore, notiStore } = useNovelsStore();

  const refetch = async () => {
    try {
      commentStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getCommentControl?.().getMany?.((commentStore.filterData || {}) as IPagingResponse<ICommentResponse>);
      commentStore.comments = response;
    } catch (error) { } finally {
      commentStore.loading = false;
    }
  }

  const searchComments = async (filter = {}) => {
    try {
      commentStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getCommentControl?.().getMany?.({ ...(commentStore.filterData || {}), ...filter } as IPagingResponse<ICommentResponse>);
      commentStore.comments = response;
    } catch (error) { } finally {
      commentStore.loading = false;
    }
  }

  const getCommentDetail = async (id: string | number) => {
    try {
      commentStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getCommentControl?.().getOne?.(id);
      commentStore.comment = response;
    } catch (error) { } finally {
      commentStore.loading = false;
    }
  }

  const deleteComment = async (id: string | number) => {
    try {
      commentStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getCommentControl?.().delete?.(id);
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
      commentStore.loading = false;
    }
  }

  const viewComment = (comment: any) => {
    commentStore.comment = comment;
  }

  return {
    refetch,
    deleteComment,
    searchComments,
    getCommentDetail,
    viewComment,
  }
}

export const runComments = () => {
  const { refetch } = useCommentsData();

  useEffect(() => {
    refetch();
  }, []);

  return {}
}