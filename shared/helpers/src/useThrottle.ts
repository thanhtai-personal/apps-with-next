import { useCallback, useRef } from 'react';

export const useThrottle = (callback: (...args: any[]) => void, delay: number) => {
  const lastCall = useRef<number | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const throttledCallback = useCallback((...args: any[]) => {
    const now = Date.now();
    if (lastCall.current === null || now - lastCall.current >= delay) {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
      lastCall.current = now;
      callback(...args);
    } else if (!timeout.current) {
      timeout.current = setTimeout(() => {
        lastCall.current = Date.now();
        callback(...args);
        timeout.current = null;
      }, delay - (now - (lastCall.current ?? 0)));
    }
  }, [callback, delay]);

  return throttledCallback;
};
