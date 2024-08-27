import { useDragableElement } from '@core-utils/react-hooks';
import { useEffect, useState } from 'react';
import "./glowingBall.style.css"

export interface IGlowingBall {
  className?: string;
  id: string;
  delay?: number;
  style?: any;
  width: number;
  top?: number | string;
  left?: number | string;
  center?: {
    color?: string;
    width?: number;
    height?: number;
  };
  middle?: {
    color?: string;
    width?: number;
    height?: number;
  };
  farest?: {
    color?: string;
    width?: number;
    height?: number;
  };
  movable?: boolean;
}

export const GlowingBall = ({
  className, id, delay = 0, style, width,
  center,
  middle,
  farest,
  movable = false,
  top = 0,
  left = 0
}: IGlowingBall) => {
  const [isDisplaying, setIsDisplaying] = useState(delay === 0);

  useEffect(() => {
    if (delay && delay > 0) {
      setTimeout(() => {
        setIsDisplaying(true);
      }, delay);
    }
  }, [delay])

  const { onSelect } = useDragableElement(id);
  return (
    <div className={`absolute duration-0] ${isDisplaying ? className : "hidden"}`} onClick={movable ? onSelect : () => { }} id={id}
      style={{
        top: top,
        left: left
      }}
    >
      <div className='relative'>
        <div
          style={{
            width: width,
            userSelect: "none",
            cursor: movable ? "grab" : "none",
            boxShadow: `0 0 ${center?.width || 40}px ${center?.height || 20}px ${center?.color || "#fff"}, 0 0 ${middle?.width || 100}px ${middle?.height || 60}px ${middle?.color || "#f0f"}, 0 0 ${farest?.width || 210}px ${farest?.height || 150}px ${farest?.color || "#0ff"}`,
            ...(style || {})
          }}
          className={`absolute cursor-grab z-50 top-[calc(50%-20px)] left-[50%-20px] rounded-full bg-white glowing-ball`}
        ></div>
      </div>
    </div>
  );
};
