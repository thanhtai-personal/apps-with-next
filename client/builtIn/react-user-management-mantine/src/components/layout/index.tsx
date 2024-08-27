import { ReactNode } from "react";
import "@core-ui/react-auto-form-mantine/dist/styles.css";
import "@core-ui/react-table-mantine/dist/styles.css";
import { IUserManagementContext, useInitialData } from "@core-ui/react-user-management";

export interface IAppLayoutProps {
  children: ReactNode;
  config?: IUserManagementContext;
}

const AppLayout = ({ children, config }: IAppLayoutProps) => {
  useInitialData(config);

  return <>{children}</>;
};

export default AppLayout;
