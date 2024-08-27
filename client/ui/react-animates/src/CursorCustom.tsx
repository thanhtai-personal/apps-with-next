import { useCustomCursor } from "@core-utils/react-hooks";
import { FaHandPointUp } from "react-icons/fa";

export const CursorCustom = () => {
  useCustomCursor('custom-cursor');

  return (
    <div
      id='custom-cursor'
      className='absolute w-8 h-8 left-[-100px] top-0] z-[60] duration-0 pointer-events-none'
    >
      <div className='relative'>
        <FaHandPointUp className='absolute left-1 top-3 w-8 h-8 text-text bg-transparent ' />
      </div>
    </div>

  )
}