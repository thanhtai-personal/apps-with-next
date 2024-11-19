import { createStore } from "@core-ui/react-mobx-state"
import { CategoryStore } from "./CategoryStore"
import { NotifyStore } from "./NotifyStore"
import AppcenterSDK, { CreateApiConfig } from "@core-sdk/app-center";
import { ReactNode, useLayoutEffect } from "react";
import { JobStore } from "./JobStore";

export class RecruiterStore {
  public categoryStore: CategoryStore;
  public notiStore: NotifyStore;
  public jobStore: JobStore;

  public constructor() {
    this.categoryStore = new CategoryStore();
    this.notiStore = new NotifyStore();
    this.jobStore = new JobStore();
  }
}

export const recruiterStore = createStore<RecruiterStore>(new RecruiterStore());

export const useRecruiterStore = recruiterStore.useStore as () => RecruiterStore;

const Provider = recruiterStore.Provider;

export const RecruiterProvider = ({ children, config }: {
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

export * from "./CategoryStore"
export * from "./NotifyStore"
export * from "./JobStore"