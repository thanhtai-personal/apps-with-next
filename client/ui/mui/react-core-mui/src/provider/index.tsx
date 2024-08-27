import { ReactNode } from "react";
import { MuiContext } from "../context";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeProviderProps } from "@mui/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { SnackbarProvider } from 'notistack';
import {
  NotiMessage, NotiStack,
  ConfirmModal, ConfirmModalMessage,
  AppModal
} from "../components";
import { createAppTheme } from "./../theme";


export interface IMuiProviderProps extends Partial<ThemeProviderProps<any>> {
  theme?: any;
  children: ReactNode;
}

const MuiContextWrapper = ({ children }: { children: ReactNode }) => {
  return <MuiContext.Provider>{children}</MuiContext.Provider>;
};

export const defaultTheme = createAppTheme({});

// eslint-disable-next-line no-var
var _ConfirmModalInstance: any = {};
var _AppModalInstance: any = {};

export const ConfirmModalInstance = {
  addMessage: (message: ConfirmModalMessage) => {
    _ConfirmModalInstance && _ConfirmModalInstance.addMessage(message);
  },
};

export const AppModalInstance = {
  addModal: (props: {
    id?; childrenComponent?; modalProps?; closeCallback?,
    disabledBackdrop?, disableCloseable?, dialogContentProps?
  }) => {
    _AppModalInstance && _AppModalInstance.addModal(props);
  },
  closeModal: (keyModal) => {
    _AppModalInstance && _AppModalInstance.closeModal(keyModal);
  },
};

var _NotiStackInstance: any = {};

export const NotiStackInstance = {
  push: (message: NotiMessage) => {
    _NotiStackInstance &&
      _NotiStackInstance.push &&
      _NotiStackInstance.push(message);
  },
};

export const MuiProvider = ({
  children,
}: IMuiProviderProps) => {
  const { themeMapping, themeKey } = MuiContext.useDataContext() || {};

  return (
    <MuiContextWrapper>
      <StyledEngineProvider injectFirst>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ThemeProvider theme={{
            ...defaultTheme,
            ...(themeKey && themeMapping?.[themeKey] ? themeMapping[themeKey] : {})
          }}>
            <SnackbarProvider anchorOrigin={{
              horizontal: 'left',
              vertical: 'top'
            }} />
            <CssBaseline />
            {children}
            <ConfirmModal
              ref={(ref: any) => {
                _ConfirmModalInstance = ref;
              }}
            />
            <AppModal
              ref={(ref: any) => {
                _AppModalInstance = ref;
              }}
            />
            <NotiStack
              ref={(ref: any) => {
                _NotiStackInstance = ref;
              }}
            />
          </ThemeProvider>
        </LocalizationProvider>
      </StyledEngineProvider>
    </MuiContextWrapper>
  );
};
