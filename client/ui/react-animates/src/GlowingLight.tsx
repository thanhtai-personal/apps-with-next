import { useDragableElement } from '@core-utils/react-hooks';
import "./glowingLight.style.css"

export interface IGlowingLine {
  className?: string;
  id: string;
}

export const GlowingLine = ({ className, id }: IGlowingLine) => {
  const { onSelect } = useDragableElement(id);
  return (
    <div className={`absolute duration-0`} onClick={onSelect} id={id}>
      <div className='relative'>
        <div
          className={`absolute cursor-grab z-50 top-[calc(50%-20px)] left-[50%-20px] w-4 h-16 rounded-lg bg-white glowing-line ${className}`}
        ></div>
      </div>
    </div>
  );
};
