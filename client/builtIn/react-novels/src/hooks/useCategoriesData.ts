import { useEffect } from "react";
import { AppcenterSDK } from "@core-sdk/app-center";
import { IPagingResponse } from "@core-ui/common-types";
import { ICategoryResponse } from "@core-ui/novels-types";
import { useNovelsStore } from "../store";

export const useCategoriesData = () => {
  const { categoryStore, notiStore } = useNovelsStore();

  const refetch = async () => {
    try {
      categoryStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getNovelsCategoryControl?.().getMany?.((categoryStore.filterData || {}) as IPagingResponse<ICategoryResponse>);
      categoryStore.categories = response;
    } catch (error) { } finally {
      categoryStore.loading = false;
    }
  }

  const searchCategories = async (filter = {}) => {
    try {
      categoryStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getNovelsCategoryControl?.().getMany?.({ ...(categoryStore.filterData || {}), ...filter } as IPagingResponse<ICategoryResponse>);
      categoryStore.categories = response;
    } catch (error) { } finally {
      categoryStore.loading = false;
    }
  }

  const getCategoryDetail = async (id: string | number) => {
    try {
      categoryStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getNovelsCategoryControl?.().getOne?.(id);
      categoryStore.category = response;
    } catch (error) { } finally {
      categoryStore.loading = false;
    }
  }

  const deleteCategory = async (id: string | number) => {
    try {
      categoryStore.loading = true;
      const response =
        await AppcenterSDK.getInstance().getNovelsCategoryControl?.().delete?.(id);
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
      categoryStore.loading = false;
    }
  }

  const viewCategory = (category: any) => {
    categoryStore.category = category;
  }

  return {
    refetch,
    deleteCategory,
    searchCategories,
    getCategoryDetail,
    viewCategory,
  }
}

export const runCategories = () => {
  const { refetch } = useCategoriesData();

  useEffect(() => {
    refetch();
  }, []);

  return {}
}