import { useEffect, useState } from "react"

export const useLocalStorageData: (dataKey: string, isDataString?: boolean) => any[] = (dataKey: string, isDataString?: boolean) => {
  const [data, setData] = useState(localStorage.getItem(dataKey));

  useEffect(() => {
    if (dataKey) {
      const storedData = localStorage.getItem(dataKey);
      if (storedData) {
        setData(isDataString ? storedData : JSON.parse(storedData));
      }
    }
  }, [dataKey])

  useEffect(() => {
    if (data) {
      localStorage.setItem(dataKey, isDataString ? data : JSON.stringify(data));
    } else {
      localStorage.removeItem(dataKey);
    }
  }, [data])

  return [data, setData] as any[]
}