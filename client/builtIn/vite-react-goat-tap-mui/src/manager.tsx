import { IRouter, ReactApplicationManager } from "@core-ui/react-core";
import { goatTapRoutes } from "./appRoute";
import { ReactNode } from "react";
import { GoatTapProvider } from "./providers/GoatTapProvider";
import { GoatTapWrapper } from "./App";

export class GoatTapManager {
  private static instance: GoatTapManager | null = null;
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  public static getInstance(props: any) {
    if (!this.instance) {
      this.instance = new GoatTapManager(props);
    }
    return this.instance;
  }

  inject: (appManager: ReactApplicationManager) => ReactApplicationManager = (
    appManager: ReactApplicationManager,
  ) => {
    const _GoatTapProvider = ({ children }: { children: ReactNode }) => {
      return <GoatTapProvider config={this.config}>
        <GoatTapWrapper>
          {children}
        </GoatTapWrapper>
      </GoatTapProvider>
    }
    appManager.addRoutes(goatTapRoutes);
    appManager.addProvider(_GoatTapProvider);
    return appManager;
  };

  remove: (appManager: ReactApplicationManager) => ReactApplicationManager = (
    appManager: ReactApplicationManager,
  ) => {
    //Todo: @Tai
    return appManager;
  };
}
