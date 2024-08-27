import { ReactNode } from "react";
import { ReactApplicationManager } from "@core-ui/react-core";
import { DrawerLayout } from "./components";
import { DrawerContext, IDrawerContext } from "@core-ui/react-drawer";

export class DrawerManager {
  private static instance: DrawerManager | null = null;
  private config: IDrawerContext;

  private constructor(config?: IDrawerContext) {
    this.config = config || {};
  }

  public static getInstance(config?: IDrawerContext): DrawerManager {
    if (!DrawerManager.instance) {
      DrawerManager.instance = new DrawerManager(config);
    } else {
      console.warn(`An instant has created before! New config was not applied`);
    }
    return DrawerManager.instance;
  }

  inject: (appManager: ReactApplicationManager) => ReactApplicationManager = (
    appManager: ReactApplicationManager,
  ) => {
    const _DrawerDrawer = ({ children }: { children: ReactNode }) => {
      return (
        <DrawerContext.Provider>
          <DrawerLayout config={this.config}>{children}</DrawerLayout>
        </DrawerContext.Provider>
      );
    };
    appManager.addProviders([_DrawerDrawer]);
    return appManager;
  };

  remove: (appManager: ReactApplicationManager) => ReactApplicationManager = (
    appManager: ReactApplicationManager,
  ) => {
    //Todo: @Tai
    return appManager;
  };
}
