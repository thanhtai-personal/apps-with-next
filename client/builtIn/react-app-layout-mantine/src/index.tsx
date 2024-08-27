import { ReactNode } from "react";
import { ReactApplicationManager } from "@core-ui/react-core";
import { ILayoutContext, LayoutContext } from "./context";
import AppLayout from "./components";

export class LayoutManager {
  private config: ILayoutContext;

  constructor(config?: ILayoutContext) {
    this.config = config || {};
  }

  inject: (appManager: ReactApplicationManager) => ReactApplicationManager = (
    appManager: ReactApplicationManager,
  ) => {
    const _AppLayout = ({ children }: { children: ReactNode }) => {
      return (
        <LayoutContext.Provider>
          <AppLayout config={this.config}>{children}</AppLayout>
        </LayoutContext.Provider>
      );
    };
    appManager.addProviders([_AppLayout]);
    return appManager;
  };

  remove: (appManager: ReactApplicationManager) => ReactApplicationManager = (
    appManager: ReactApplicationManager,
  ) => {
    //Todo: @Tai
    return appManager;
  };
}

export * from "./components/RouteLayout"
export * from "./components/AppMenu"
export * from "./components/Footer"
export * from "./components/Header"
export * from "./components/index"
export * from "./context"
