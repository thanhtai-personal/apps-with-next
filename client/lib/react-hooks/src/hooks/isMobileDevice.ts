import { useState, useEffect } from 'react';
import { isMobileOnly } from 'react-device-detect';

export const useMobileDetect = () => {
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(isMobileOnly);

  useEffect(() => {
    const userAgentCheck = () => {
      setIsMobileDevice(isMobileOnly);
    };
    userAgentCheck();
  }, []);

  return isMobileDevice;
};