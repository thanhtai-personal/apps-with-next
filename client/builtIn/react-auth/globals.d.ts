import { Telegram } from "@twa-dev/types"

declare global {
  interface Window {
    Telegram: Telegram;
    FB: any; // or a more specific type if you define one
    fbAsyncInit: any;
  }
}