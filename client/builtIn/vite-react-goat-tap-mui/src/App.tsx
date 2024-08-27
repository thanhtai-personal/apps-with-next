import { ReactNode } from "react";
import { GoatTapLayout } from "./layout"
import "./reset.css";
import "./index.css";
import { ThemeProvider } from "./styles/ThemeProvider";

export const GoatTapWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <GoatTapLayout>
        {children}
      </GoatTapLayout>
    </ThemeProvider>);
};
