import { ReactNode, useEffect, useState } from 'react';
import { LazyLoadImage } from "@core-ui/react-lazyload"
import { useInterval } from "@core-utils/utils-helpers";

export interface IImageSlideBackgroundProps {
  children: ReactNode;
  className?: string;
  images: string[];
  id: string;
  style: React.CSSProperties;
  imgStyle: React.CSSProperties;
  height?: string;
  fadeDuration?: number;
  interval?: number;
}

export const ImageSlideBackground = ({
  children,
  className,
  images,
  id,
  style = {},
  imgStyle = {},
  height = "100vh",
  fadeDuration = 1000,
  interval = 20000
}: IImageSlideBackgroundProps) => {
  const [showingImageIdx, setShowingImageIdx] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useInterval(() => {
    setFadeOut(true);
    setTimeout(() => {
      setShowingImageIdx((prev) => prev < images.length - 1 ? prev + 1 : 0);
      setFadeOut(false);
    }, fadeDuration);
  }, interval);

  return (
    <div className={`w-full h-full relative`} style={{
      overflow: "hidden",
      height,
      ...style
    }}>
      {<LazyLoadImage
        id={id}
        src={images?.[showingImageIdx]}
        className={`absolute right-0 bottom-0 w-full h-full z-10 transition-opacity duration-${fadeDuration}`}
        style={{
          width: "100%",
          objectFit: "cover",
          opacity: fadeOut ? 0.2 : 1,
          ...imgStyle,
        }}
      />}
      <div
        className={`absolute w-full h-full left-0 top-0 bg-transparent z-20 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
