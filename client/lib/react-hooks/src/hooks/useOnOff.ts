import { useCallback, useState } from 'react';

export const useOnOff = (defaultOn?: boolean) => {
  const [isOn, setIsOn] = useState(defaultOn || false);
  const turnOff = useCallback(() => {
    setIsOn(false);
  }, []);

  const turnOn = useCallback(() => {
    setIsOn(true);
  }, []);

  return {
    isOn,
    turnOn,
    turnOff
  };
};
