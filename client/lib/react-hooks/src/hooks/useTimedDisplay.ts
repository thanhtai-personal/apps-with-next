import { useLayoutEffect, useState } from "react"

export const useTimedDisplay = (aliveTime?: number) => {

  const [isDisplaying, setIsDisplaying] = useState(true);

  useLayoutEffect(() => {
    if (aliveTime) {
      const timeout = setTimeout(() => {
        setIsDisplaying(false);
      }, aliveTime)
      
      return () => {
        clearTimeout(timeout);
      }
    }
  }, [aliveTime])

  return isDisplaying
}