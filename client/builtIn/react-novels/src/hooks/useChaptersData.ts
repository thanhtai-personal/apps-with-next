import { useEffect } from "react";
import { AppcenterSDK } from "@core-sdk/app-center";
import { IPagingResponse } from "@core-ui/common-types";
import { IChapterResponse } from "@core-ui/novels-types";
import { useNovelsStore } from "../store";

export const useChaptersData = () => {
  const { chapterStore, notiStore } = useNovelsStore();

  const refetch = async () => {
    try {
      chapterStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getChapterControl?.().getMany?.((chapterStore.filterData || {}) as IPagingResponse<IChapterResponse>);
      chapterStore.chapters = response;
    } catch (error) { } finally {
      chapterStore.loading = false;
    }
  }

  const searchChapters = async (filter = {}) => {
    try {
      chapterStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getChapterControl?.().getMany?.({ ...(chapterStore.filterData || {}), ...filter } as IPagingResponse<IChapterResponse>);
      chapterStore.chapters = response;
    } catch (error) { } finally {
      chapterStore.loading = false;
    }
  }

  const getChapterDetail = async (id: string | number) => {
    try {
      chapterStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getChapterControl?.().getOne?.(id);
      chapterStore.chapter = response;
    } catch (error) { } finally {
      chapterStore.loading = false;
    }
  }

  const deleteChapter = async (id: string | number) => {
    try {
      chapterStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getChapterControl?.().delete?.(id);
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
      chapterStore.loading = false;
    }
  }

  const viewChapter = (chapter: any) => {
    chapterStore.chapter = chapter;
  }

  return {
    refetch,
    deleteChapter,
    searchChapters,
    getChapterDetail,
    viewChapter,
  }
}

export const runChapters = () => {
  const { refetch } = useChaptersData();

  useEffect(() => {
    refetch();
  }, []);

  return {}
}