/// <reference types="vite/client" />

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
}

declare interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_TELEGRAM_BOT_URL: string;
  readonly VITE_TELEGRAM_APP_URL: string;
  readonly VITE_TELEGRAM_BOT_WALLET_ADDRESS: string;
  readonly VITE_IS_TEST_NET: boolean;
  readonly PRIVATE_KEY_PATH: string;
  readonly CERTIFICATE_PATH: string;

  // Add other environment variables here as needed
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}