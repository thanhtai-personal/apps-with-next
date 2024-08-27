import { ReactNode } from "react";
import {
  MantineProvider,
  MantineProviderProps,
  MantineTheme,
} from "@mantine/core";
import { TTCMantineContext } from "../context";
import "./mantine.css"

export interface IMantineProviderProps extends MantineProviderProps {
  theme?: Partial<MantineTheme>;
  children: ReactNode;
}

const MantineContextWrapper = ({ children }: { children: ReactNode }) => {
  return <TTCMantineContext.Provider>{children}</TTCMantineContext.Provider>;
};

export const TTCMantineProvider = ({
  children,
  ...nestedProps
}: IMantineProviderProps) => {
  const { themeMapping, themeKey } = TTCMantineContext.useDataContext() || {};

  return (
    <MantineContextWrapper>
      <MantineProvider
        theme={themeMapping && themeKey ? themeMapping[themeKey] : undefined}
        withGlobalClasses
        {...nestedProps}
      >
        {children}
      </MantineProvider>
    </MantineContextWrapper>
  );
};
