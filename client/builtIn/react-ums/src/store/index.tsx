import { createStore } from "@core-ui/react-mobx-state"
import { UserStore } from "./UserStore"
import { RoleStore } from "./RoleStore"
import { NotifyStore } from "./NotifyStore"
import { AppcenterSDK, CreateApiConfig } from "@core-sdk/app-center";
import { ReactNode, useLayoutEffect } from "react";
import { PermissionStore } from "./PermissionStore";

export class UMSStore {
  public userStore: UserStore;
  public roleStore: RoleStore;
  public notiStore: NotifyStore;
  public permissionStore: PermissionStore;

  public constructor() {
    this.userStore = new UserStore();
    this.roleStore = new RoleStore();
    this.notiStore = new NotifyStore();
    this.permissionStore = new PermissionStore();
  }
}

export const uMSStore = createStore<UMSStore>(new UMSStore());

export const useUMSStore = uMSStore.useStore as () => UMSStore;

const Provider = uMSStore.Provider;

export const UMSProvider = ({ children, config }: {
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

export * from "./UserStore"
export * from "./RoleStore"
export * from "./PermissionStore"
export * from "./NotifyStore"