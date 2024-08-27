import { Telegram } from "@twa-dev/types"
declare global {
  interface Window {
    useStore: <StoreDataType>() => StoreDataType;
  }
  interface Window {
    Telegram: Telegram;
  }
}

if (typeof window.Buffer === 'undefined') {
  const { Buffer } = require('buffer');
  window.Buffer = Buffer;
}