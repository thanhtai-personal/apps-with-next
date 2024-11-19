import { ReactNode, useEffect, useState } from 'react';
import { LazyLoadVideo } from "@core-ui/react-lazyload"

export interface IVideoBackground {
  children: ReactNode;
  className?: string;
  src: string;
  id: string;
  preloadSrc: string;
  disabled?: boolean;
  muted?: boolean;
  classes?: {
    container?: string;
  }
}

export const VideoBackground = ({
  children,
  className,
  src,
  id = "source-video",
  classes,
  preloadSrc,
  disabled,
  muted = false,
}: IVideoBackground) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (disabled) return;
    const videoElem = document.getElementById(id);
    if (videoElem) {
      videoElem.setAttribute("src", src);

      videoElem.onloadstart = () => {
        setIsLoaded(false);
      }

      videoElem.onloadeddata = () => {
        setIsLoaded(true);
      }
    }

  }, [src, id, disabled])

  return (
    <div className={`w-full h-full relative ${classes?.container}`}>
      {!disabled && <LazyLoadVideo
        id={id}
        src={src}
        preloadSrc={preloadSrc}
        autoPlay
        muted={muted}
        loop
        sourceClass='w-full h-full'
        videoClass={`w-full h-full object-cover`}
        className={`absolute right-0 bottom-0 w-full h-full z-10 ${!isLoaded && "display-none"}`}
      />}
      <div
        className={`absolute w-full h-full left-0 top-0 bg-transparent z-20 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
