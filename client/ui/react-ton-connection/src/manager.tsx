import { ReactApplicationManager } from "@core-ui/react-core";
import { TonConnectionProvider, ITonConnectionConfig } from "./components/Provider";
import { ReactNode } from "react";

export class TonConnectionManager {
  private static instance: TonConnectionManager | null = null;
  private config: ITonConnectionConfig;

  constructor(config: ITonConnectionConfig) {
    this.config = config;
  }

  public static getInstance = (config: ITonConnectionConfig) => {
    if (!this.instance) {
      this.instance = new TonConnectionManager(config)
    }
    return this.instance;
  }

  inject = (applicationManager: ReactApplicationManager) => {
    const TonConnectionProviderWrapper = ({ children }: { children: ReactNode }) => {
      return (
        <TonConnectionProvider config={this.config}>
          {children}
        </TonConnectionProvider>
      );
    };
    applicationManager.addProvider(TonConnectionProviderWrapper)
    return applicationManager;
  }
}
