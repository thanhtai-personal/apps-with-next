import { ReactNode } from "react";
import { AuthContext } from "../context";
import { Header } from "./Header";
import { Container } from "@core-ui/react-mantine-core";
import { AppMenu } from "./AppMenu";
import { Footer } from "./Footer";

export interface IRouteLayoutProps {
  children: ReactNode;
  hideMenu?: boolean;
  hideFooter?: boolean;
  classes?: {
    body?: string;
  };
}

export const RouteLayout = ({ children, classes, hideMenu, hideFooter }: IRouteLayoutProps) => {
  return (
    <AuthContext.Provider>
      <div className="w-full flex flex-col">
        <Header isUnderRoute />
        <Container fluid className={"w-full mt-1 bg-slate-100 px-0 py-0"}>
          <div className="flex flex-row">
            {!hideMenu && <AppMenu isUnderRoute />}
            <Container
              fluid
              className={`w-full flex !p-0 flex-row justify-start items-start rounded-sm ${classes?.body}`}
            >
              {children}
            </Container>
          </div>
        </Container>
        {!hideFooter && <Footer isUnderRoute />}
      </div>
    </AuthContext.Provider>
  );
};
