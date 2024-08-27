import { useEffect, useState } from "react"

export const useDelayedDisplay = (delayTime?: number) => {
  const [isDisplay, setIsDisplay] = useState(!delayTime);

  useEffect(() => {
    if (delayTime && delayTime > 0) {
      const timeout = setTimeout(() => {
        setIsDisplay(true);
      }, delayTime)

      return () => {
        clearTimeout(timeout);
      }
    }
  }, [delayTime])

  return isDisplay
}