import { ThemeProvider } from "@material-tailwind/react";
import { ReactNode } from "react";

export interface IMaterialTailwindProviderProps {
  children: ReactNode;
}
 
export const MaterialTailwindProvider = ({
  children
}: IMaterialTailwindProviderProps) => {
  const customTheme = {}
 
  return <ThemeProvider value={customTheme}>{
    children
  }</ThemeProvider>;
}