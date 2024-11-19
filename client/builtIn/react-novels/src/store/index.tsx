import { createStore } from "@core-ui/react-mobx-state"
import { NovelStore } from "./NovelStore"
import { ChapterStore } from "./ChapterStore"
import { CommentStore } from "./CommentStore"
import { AuthorStore } from "./AuthorStore"
import { CategoryStore } from "./CategoryStore"
import { NotifyStore } from "./NotifyStore"
import AppcenterSDK, { CreateApiConfig } from "@core-sdk/app-center";
import { ReactNode, useLayoutEffect } from "react";

export class NovelsStore {
  public novelStore: NovelStore;
  public chapterStore: ChapterStore;
  public commentStore: CommentStore;
  public authorStore: AuthorStore;
  public categoryStore: CategoryStore;
  public notiStore: NotifyStore;

  public constructor() {
    this.novelStore = new NovelStore();
    this.chapterStore = new ChapterStore();
    this.commentStore = new CommentStore();
    this.authorStore = new AuthorStore();
    this.categoryStore = new CategoryStore();
    this.notiStore = new NotifyStore();
  }
}

export const novelsStore = createStore<NovelsStore>(new NovelsStore());

export const useNovelsStore = novelsStore.useStore as () => NovelsStore;

const Provider = novelsStore.Provider;

export const NovelsProvider = ({ children, config }: {
  children: ReactNode;
  config: {
    apiConfig: CreateApiConfig;
  }
}) => {
  
  useLayoutEffect(() => {
    if (config) {
      AppcenterSDK.getInstance(config.apiConfig)
    }
  }, [config])

  return <Provider>
    {children}
  </Provider>
}

export * from "./NovelStore"
export * from "./ChapterStore"
export * from "./CommentStore"
export * from "./AuthorStore"
export * from "./CategoryStore"
export * from "./NotifyStore"