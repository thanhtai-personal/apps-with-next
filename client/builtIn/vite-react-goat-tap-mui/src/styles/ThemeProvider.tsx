import { MuiActionType, MuiContext, MuiProvider } from "@core-ui/react-mui-core";
import { ReactNode, useEffect } from "react"
import { appTheme } from "./appTheme";



export const ThemeWrapper = ({ children }: {
  children: ReactNode;
}) => {

  const themeDispatcher = MuiContext.useDataDispatchContext();

  useEffect(() => {
    themeDispatcher && themeDispatcher({
      type: MuiActionType.ADD_THEME,
      payload: {
        newKey: "appTheme",
        newTheme: appTheme,
      }
    })
    themeDispatcher && themeDispatcher({
      type: MuiActionType.UPDATE_THEME,
      payload: {
        themeKey: "appTheme",
      }
    })
  }, [])

  return children
}

export const ThemeProvider = ({ children }: {
  children: ReactNode;
}) => {

  return <MuiProvider>
    <ThemeWrapper>
      {children}
    </ThemeWrapper>
  </MuiProvider>
}