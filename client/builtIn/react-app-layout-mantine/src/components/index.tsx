import { ReactNode, useEffect } from "react";
import {
  LayoutContext,
  ILayoutContext,
  LayoutActionType,
  AuthContext,
} from "../context";
import { Header } from "./Header";
import { AppMenu } from "./AppMenu";
import { Footer } from "./Footer";
import { Container } from "@core-ui/react-mantine-core";

export interface IAppLayoutProps {
  children: ReactNode;
  config?: ILayoutContext;
}

export const AppLayout = ({ children, config = {} }: IAppLayoutProps) => {
  const userManagementDispatcher = LayoutContext.useDataDispatchContext();

  useEffect(() => {
    userManagementDispatcher &&
      userManagementDispatcher({
        type: LayoutActionType.INIT_STATE,
        payload: {
          ...config,
        },
      });
  }, []);

  return (
    <AuthContext.Provider>
      {config.isAllRouteLayout && <Header />}
      <Container fluid className={"w-full bg-slate-100 px-0 py-0"}>
        <div className="flex flex-row">
          {config.isAllRouteLayout && <AppMenu />}
          {config.isAllRouteLayout ? (
            <Container
              fluid
              className={`w-full flex flex-row justify-start items-start rounded-sm ${config.classes?.body}`}
            >
              {children}
            </Container>
          ) : (
            children
          )}
        </div>
      </Container>
      {config.isAllRouteLayout && <Footer />}
    </AuthContext.Provider>
  );
};

export default AppLayout;
