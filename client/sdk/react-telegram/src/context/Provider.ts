import { ReactNode, useEffect } from "react"
import { ITelegramConfig, TelegramApiManager } from "./manager"

export interface ITelegramProvider {
  children: ReactNode;
  config: ITelegramConfig;
}

export const TelegramProvider = (({ children, config }: ITelegramProvider) => {
  useEffect(() => {
    TelegramApiManager.getInstance(config)
  }, [])
  return children
})