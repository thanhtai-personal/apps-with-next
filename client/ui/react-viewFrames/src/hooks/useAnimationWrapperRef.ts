import { useRef, useImperativeHandle, Ref } from "react";

export interface AnimationRef {
  triggerQuitAnimate: (className: string) => void;
}

export const useAnimationWrapperRef = (ref: Ref<AnimationRef>) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    triggerQuitAnimate: (quitAnimate: string) => {
      if (wrapperRef.current) {
        wrapperRef.current.classList.remove('animate-slide_up');
        wrapperRef.current.classList.add(quitAnimate);
      }
    },
  }));

  return wrapperRef
}