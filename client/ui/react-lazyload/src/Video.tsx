import { useState, useEffect, MediaHTMLAttributes } from 'react';
import { LazyLoadImage } from '.';

interface ILazyLoadVideo extends MediaHTMLAttributes<HTMLVideoElement> {
  id: string;
  src: string;
  preloadSrc: string;
  type?: string;
  videoClass?: string;
  sourceClass?: string;
}

export const LazyLoadVideo = ({
  id,
  src,
  type,
  videoClass = '',
  sourceClass = '',
  className = '',
  preloadSrc,
  ...restProps
}: ILazyLoadVideo) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const videoElement = document.getElementById(id) as HTMLVideoElement;
    const sourceElement = document.getElementById(
      `source-${id}`
    ) as HTMLSourceElement;

    const handleLoaded = () => {
      setLoaded(true);
      // videoElement.play();
      // videoElement.style.display = 'block';
    };

    if (videoElement && sourceElement) {
      videoElement.addEventListener('loadeddata', handleLoaded);
      sourceElement.src = src;
    }

    return () => {
      if (videoElement && sourceElement) {
        videoElement.removeEventListener('loadeddata', handleLoaded);
      }
    };
  }, [id, src]);

  return (
    <div className={`w-full h-full ${className}`}>
      <div className={`relative w-full h-full`}>
        {!loaded && (
          <div
            className='absolute inset-0 flex bg-black justify-center items-center p-4'
            style={{
              minHeight: 180,
            }}
          >
            <LazyLoadImage src={preloadSrc}
              style={{
                height: restProps.style?.height || '100%',
                width: restProps.style?.width || '100%',
              }} />
          </div>
        )}
        <video
          id={id}
          autoPlay
          playsInline
          muted
          loop
          className={`${videoClass}`}
          style={{
            height: restProps.style?.height || '100%',
            width: restProps.style?.width || '100%',
          }}
          unselectable="on"
          controls
          {...restProps}
        >
          <source
            id={`source-${id}`}
            className={sourceClass}
            src={src}
            type={type}
          />
        </video>
      </div>
    </div>
  );
};
