import { useDragableElement } from "@core-utils/react-hooks";
import { ReactNode } from "react";

export const BubbleWrapper = ({
  className,
  id,
  children,
  onClick,
  style
}: {
  id: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  style?: any;
}) => {
  const { onSelect } = useDragableElement(`bubble-${id}`);

  return <div onClick={onClick || onSelect} style={style || {}} id={`bubble-${id}`} className={`text-lg ${className}`}>
    <div className="bubble-container">
      <div className="bubble flex justify-center items-center">
        {children && children}
      </div>
    </div>
  </div>
}