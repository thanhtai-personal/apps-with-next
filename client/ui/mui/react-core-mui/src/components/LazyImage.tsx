import React, { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';

export interface LazyImageProps {
  src: string;
  alt?: string;
  lazy?: boolean;
  placeholder?: React.ReactNode;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  loadingElement?: React.ReactNode;
  className?: string;
  containerStyle?: React.CSSProperties;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt = '',
  lazy = true,
  placeholder = <CircularProgress />,
  width = '100%',
  height = 'auto',
  style = {},
  containerStyle = {},
  loadingElement,
  className
}) => {
  const [isLoading, setIsLoading] = useState(lazy);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoading(false);
      setHasError(false);
    };
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [src]);

  return (
    <Box
      // position="relative"
      width={width}
      height={height}
      style={containerStyle}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {isLoading && (loadingElement || (
        <Box position="absolute" top="50%" left="50%" style={{ transform: 'translate(-50%, -50%)' }}>
          {placeholder}
        </Box>)
      )}
      {!hasError && (
        <img
          src={src}
          className={className || ""}
          alt={alt}
          style={{
            width: 'auto',
            height: 'auto',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
            ...style
          }}
        />
      )}
      {hasError && !isLoading && <Box>Error loading image</Box>}
    </Box>
  );
};
