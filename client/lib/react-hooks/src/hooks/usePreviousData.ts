import { useRef, useEffect } from 'react';

export const usePreviousData = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};