import { ReactNode } from "react";
import { DrawerContext, IDrawerContext, useDrawerLayout } from "@core-ui/react-drawer";

export interface IDrawerLayoutProps {
  children: ReactNode;
  config?: IDrawerContext;
}

export const DrawerLayout = ({ children, config = {} }: IDrawerLayoutProps) => {
  useDrawerLayout(config);

  return <DrawerContext.Provider>{children}</DrawerContext.Provider>;
};
