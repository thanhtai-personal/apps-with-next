import { useDragableElement } from '@core-utils/react-hooks';
import "./glowingLight.style.css"
import { CSSProperties } from "react";

export interface IGlowingLine {
  className?: string;
  id: string;
  style?: CSSProperties;
}

export const GlowingLine = ({ className, id, style = {} }: IGlowingLine) => {
  const { onSelect } = useDragableElement(id);
  return (
    <div className={`absolute duration-0`} onClick={onSelect} id={id}>
      <div className='relative'>
        <div
          className={`absolute cursor-grab z-50 top-[calc(50%-20px)] left-[50%-20px] w-4 h-16 rounded-lg bg-white glowing-line ${className}`}
          style={style}
        ></div>
      </div>
    </div>
  );
};
