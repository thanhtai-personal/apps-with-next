import { ReactNode } from "react";

export type DropdownActionType = "hover" | "click"

export interface IDropdownProps {
  id: string;
  className?: string;
  renderedButton: ReactNode;
  actionType: DropdownActionType;
  children?: ReactNode;
  menu?: ReactNode;
  classes?: {
    menu?: string;
  }
}

export const DropDown = ({
  id,
  className,
  renderedButton,
  actionType,
  children,
  menu,
  classes
}: IDropdownProps) => {

  return (
    <div className={`relative ${className}`}>
      <div id={`dropdown-button-${id}`} data-dropdown-toggle={
        actionType === "click" ? "dropdown" : "dropdownHover"}>
        {renderedButton}
      </div>
      <div id={`dropdown-${id}`}
        className={`z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${
          classes?.menu
        }`}>
        {children || menu}
      </div>
    </div>
  )
}