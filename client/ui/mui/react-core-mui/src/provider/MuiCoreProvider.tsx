import { ReactNode } from "react";
import { ThemeProviderProps } from "@mui/styles";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { MuiCoreStoreProvider } from "../store";
import { AppModalComponent } from "./AppModalComponent";
import { ConfirmModalComponent } from "./ConfirmModalComponent";
import { NotiStackComponent } from "./NotiStackComponent";
import { ThemeProviderComponent } from "./ThemeProviderComponent";

export interface IMuiProviderProps extends Partial<ThemeProviderProps<any>> {
  theme?: any;
  children: ReactNode;
}

export const MuiProvider = ({
  children,
}: IMuiProviderProps) => {
  return (
    <MuiCoreStoreProvider>
      <ThemeProviderComponent>
        <SnackbarProvider anchorOrigin={{
          horizontal: 'left',
          vertical: 'top'
        }} />
        <CssBaseline />
        {children}
        <AppModalComponent />
        <ConfirmModalComponent />
        <NotiStackComponent />
      </ThemeProviderComponent>
    </MuiCoreStoreProvider>
  );
};
