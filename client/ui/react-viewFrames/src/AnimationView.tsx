import { ReactNode, forwardRef } from "react";
import { useDelayedDisplay } from "@core-utils/react-hooks";
import { AnimationRef, useAnimationWrapperRef } from "./hooks/useAnimationWrapperRef";

export interface IAnimationView {
  children: ReactNode;
  className?: string;
  id?: string;
  duration?: number;
  delay?: number;
  disabled?: boolean;
}

export namespace AnimationView {
  export const FadeInRTL = forwardRef<AnimationRef, IAnimationView>(
    ({ children, className, id, delay }: IAnimationView, ref) => {
      const isDisplay = useDelayedDisplay(delay);
      const wrapperRef = useAnimationWrapperRef(ref);
      return (
        <div
          id={id}
          ref={wrapperRef}
          className={`${isDisplay ? "animate-fade_in_rtl" : "hidden"} ${!isDisplay && "hidden"} ${className}`}
        >
          {children}
        </div>
      );
    },
  );

  export const FadeIn = forwardRef<AnimationRef, IAnimationView>(
    ({ children, className, id, delay }: IAnimationView, ref) => {
      const isDisplay = useDelayedDisplay(delay);
      const wrapperRef = useAnimationWrapperRef(ref);
      return (
        <div
          id={id}
          ref={wrapperRef}
          className={`${isDisplay ? `animate-fade_in ${className}` : "hidden"}`}
        >
          {children}
        </div>
      );
    },
  );

  export const FadeInLTR = forwardRef<AnimationRef, IAnimationView>(
    ({ children, className, id, delay }: IAnimationView, ref) => {
      const isDisplay = useDelayedDisplay(delay);
      const wrapperRef = useAnimationWrapperRef(ref);
      return (
        <div
          id={id}
          ref={wrapperRef}
          className={`${isDisplay ? "animate-fade_in_ltr" : "hidden"} ${className}`}
        >
          {children}
        </div>
      );
    },
  );

  export const SlideIn = forwardRef<AnimationRef, IAnimationView>(
    ({ children, className, id, delay }: IAnimationView, ref) => {
      const isDisplay = useDelayedDisplay(delay);
      const wrapperRef = useAnimationWrapperRef(ref);
      return (
        <div
          id={id}
          ref={wrapperRef}
          className={`${isDisplay ? "animate-slide_in" : "hidden"} ${className}`}
        >
          {children}
        </div>
      );
    },
  );

  export const SlideLTR = forwardRef<AnimationRef, IAnimationView>(
    ({ children, className, id, delay }: IAnimationView, ref) => {
      const isDisplay = useDelayedDisplay(delay);
      const wrapperRef = useAnimationWrapperRef(ref);
      return (
        <div
          id={id}
          ref={wrapperRef}
          className={` ${isDisplay ? "animate-slide_ltr" : "hidden"} ${className}`}
        >
          {children}
        </div>
      );
    },
  );

  export const SlideDown = forwardRef<AnimationRef, IAnimationView>(
    ({ children, className, id, delay }: IAnimationView, ref) => {
      const isDisplay = useDelayedDisplay(delay);
      const wrapperRef = useAnimationWrapperRef(ref);
      return (
        <div
          id={id}
          ref={wrapperRef}
          className={` ${isDisplay ? "animate-slide_down" : "hidden"} ${className}`}
        >
          {children}
        </div>
      );
    },
  );

  export const SlideUp = forwardRef<AnimationRef, IAnimationView>(
    ({ children, className = "", id = "", delay = 0 }, ref) => {
      const isDisplay = useDelayedDisplay(delay);
      const wrapperRef = useAnimationWrapperRef(ref);
      return (
        <div
          id={id}
          ref={wrapperRef}
          className={` ${isDisplay ? `animate-slide_up ${className}` : "hidden"}`}
        >
          {children}
        </div>
      );
    },
  );

  export const ItemSlide = forwardRef<AnimationRef, IAnimationView>(
    ({ children, className = "", id = "", delay = 0 }, ref) => {
      const isDisplay = useDelayedDisplay(delay);
      const wrapperRef = useAnimationWrapperRef(ref);
      return (
        <div
          id={id}
          ref={wrapperRef}
          className={` ${isDisplay ? `animate-slide_item ${className}` : "hidden"}`}
        >
          {children}
        </div>
      );
    },
  );

  export const Bird = forwardRef<AnimationRef, IAnimationView>(
    ({ children, className, id, disabled, delay }: IAnimationView, ref) => {
      const isDisplay = useDelayedDisplay(delay);
      const wrapperRef = useAnimationWrapperRef(ref);
      return (
        <div
          id={id}
          ref={wrapperRef}
          className={`${isDisplay && !disabled ? `animate-bird ${className}` : "hidden"} `}
        >
          {children}
        </div>
      );
    },
  );

  export const TextAppearance = forwardRef<AnimationRef, IAnimationView>(
    ({ children, className, id, disabled, delay }: IAnimationView, ref) => {
      const isDisplay = useDelayedDisplay(delay);
      const wrapperRef = useAnimationWrapperRef(ref);
      return (
        <div
          id={id}
          ref={wrapperRef}
          className={`${isDisplay && !disabled ? "animate-text_appear" : "hidden"} ${className}`}
        >
          {children}
        </div>
      );
    },
  );

  export const SpaceAppear = forwardRef<AnimationRef, IAnimationView>(
    ({ children, className, id, disabled, delay }: IAnimationView, ref) => {
      const isDisplay = useDelayedDisplay(delay);
      const wrapperRef = useAnimationWrapperRef(ref);
      return (
        <div
          id={id}
          ref={wrapperRef}
          className={`${isDisplay && !disabled ? "animate-space_appear" : "hidden"} ${className}`}
        >
          {children}
        </div>
      );
    },
  );

  export const LoadingPage = forwardRef<AnimationRef, IAnimationView>(
    ({ children, className, id, delay }: IAnimationView, ref) => {
      const isDisplay = useDelayedDisplay(delay);
      const wrapperRef = useAnimationWrapperRef(ref);
      return (
        <div
          id={id}
          ref={wrapperRef}
          className={` ${isDisplay ? "animate-loading_page" : "hidden"} ${className}`}
        >
          {children}
        </div>
      );
    },
  );
}
