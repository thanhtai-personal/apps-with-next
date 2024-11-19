import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useMuiCoreStore } from "../store";
import { observer } from "@core-ui/react-mobx-state";
import { createAppTheme } from "../theme";

const defaultTheme = createAppTheme({});

export const ThemeProviderComponent = observer(({
  children,
}: {
  children: ReactNode
  }) => {
  const { themeStore } = useMuiCoreStore();
  
  return (
    <ThemeProvider theme={themeStore.themeMapper?.[themeStore.themeKey || ""] || defaultTheme}>
      {children}
    </ThemeProvider>
  );
});
