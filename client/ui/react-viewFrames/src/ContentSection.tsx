import { ReactNode } from "react";

export interface IContentSection {
  children: ReactNode;
  className?: string;
}

export const ContentSection = ({ children, className }: IContentSection) => {

  return (
    <div className={`w-screen flex flex-row justify-center`}>
      <div className={`w-full bg-transparent max-w-[1500px] ${className}`}>
        {children}
      </div>
    </div>
  );
}