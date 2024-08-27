import { useLocalObservable } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import { ReactNode } from "react";

export const ScrollContainer = ({
  children,
  scrollY,
  scrollX
}: {
  children: ReactNode;
  scrollY?: boolean;
  scrollX?: boolean;
}) => {
  const state = useLocalObservable(() => ({
    startX: 0,
    startY: 0,
  }));

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch:any = e.touches[0];
    state.startX = touch.clientX;
    state.startY = touch.clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch: any = e.touches[0];
    const moveX = touch.clientX - state.startX;
    const moveY = touch.clientY - state.startY;

    if (scrollX) {
      const newScrollLeft = e.currentTarget.scrollLeft - moveX;
      // Constrain scrollLeft to the bounds of the scrollable area
      e.currentTarget.scrollLeft = Math.max(
        0,
        Math.min(e.currentTarget.scrollWidth - e.currentTarget.clientWidth, newScrollLeft)
      );
      state.startX = touch.clientX;
    }

    if (scrollY) {
      const newScrollTop = e.currentTarget.scrollTop - moveY;
      // Constrain scrollTop to the bounds of the scrollable area
      e.currentTarget.scrollTop = Math.max(
        0,
        Math.min(e.currentTarget.scrollHeight - e.currentTarget.clientHeight, newScrollTop)
      );
      state.startY = touch.clientY;
    }
  };

  const handleTouchEnd = () => {
    state.startX = 0;
    state.startY = 0;
  };

  return (
    <Flex
      fullSize
      style={{
        overflowX: scrollX ? 'auto' : 'hidden',
        overflowY: scrollY ? 'auto' : 'hidden',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      {children}
    </Flex>
  );
};
