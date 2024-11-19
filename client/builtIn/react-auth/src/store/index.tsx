import { createStore } from "@core-ui/react-mobx-state";
import { AuthStore } from "./AuthStore";
import { NotifyStore } from "./NotifyStore";
import { ReactNode, useLayoutEffect } from "react";
import AppcenterSDK, { CreateApiConfig } from "@core-sdk/app-center";

export class AuthenticationStore {
  public authStore: AuthStore;
  public notiStore: NotifyStore;

  public constructor() {
    this.authStore = new AuthStore();
    this.notiStore = new NotifyStore();
  }
}

export const authenticationStore = createStore<AuthenticationStore>(new AuthenticationStore());

export const useAuthenticationStore = authenticationStore.useStore as () => AuthenticationStore;

const Provider = authenticationStore.Provider;

export const AuthProvider = ({ children, config }: {
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
export * from "./NotifyStore"
export * from "./AuthStore"