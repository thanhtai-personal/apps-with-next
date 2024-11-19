import * as React from "react";
import { NextUIProvider as CoreNextUIProvider } from "@nextui-org/system";

export interface ProvidersProps {
  children: React.ReactNode;
  navigate: (path: string) => void;
}

export function NextUIProvider({ children, navigate }: ProvidersProps) {

  return (
    <CoreNextUIProvider navigate={navigate}>
      {children}
    </CoreNextUIProvider>
  );
}
