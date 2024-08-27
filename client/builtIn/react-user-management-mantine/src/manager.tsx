import { ReactNode } from "react";
import { router } from "./appRoute";
import AppLayout from "./components/layout";
import { ReactApplicationManager } from "@core-ui/react-core";
import { IUserManagementContext, UserManagementContext } from "@core-ui/react-user-management";

export class UserManagementManager {
  private config: IUserManagementContext;

  constructor(config?: IUserManagementContext) {
    this.config = config || {};
  }

  inject = (appManager: ReactApplicationManager) => {
    const _AppLayout = ({ children }: { children: ReactNode }) => {
      return (
        <UserManagementContext.Provider>
          <AppLayout config={this.config}>{children}</AppLayout>
        </UserManagementContext.Provider>
      );
    };
    appManager.addProviders([_AppLayout]);
    appManager.addRoutes(router);
    return appManager;
  };

  remove = (appManager: ReactApplicationManager) => {
    appManager.removeRoutes(router);
    return appManager;
  };
}
