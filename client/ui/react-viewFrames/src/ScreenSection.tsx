import { ReactNode } from "react";

export interface IScreenSection {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const ScreenSection = ({ children, className, id }: IScreenSection) => {

  return (
    <div id={id || ""} className={`w-screen h-screen overflow-hidden ${className}`}>
      {children}
    </div>
  );
}