import { ReactNode } from "react"

export interface IScreenSection {
  children: ReactNode;
  className?: string;
}

export const ScreenSection = ({ children, className }: IScreenSection) => {

  return (
    <div className="w-full min-h-screen">
      <div className={className}>
        {children}
      </div>
    </div>
  )
}