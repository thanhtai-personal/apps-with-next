import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { ReactNode } from 'react';

export interface ITonConnectionConfig {
  manifestUrl: string;
  uiPreferences: any;
  walletsListConfiguration: {
    includeWallets: {
      appName?: string;
      name?: string;
      imageUrl?: string;
      aboutUrl?: string;
      jsBridgeKey?: string;
      platforms?: string[];
      universalLink?: string;
      bridgeUrl?: string;
    }[];
  };
  actionsConfiguration: {
    returnStrategy: string;
    twaReturnUrl: string;
  }
}

export const TonConnectionProvider = ({ children, config }: {
  children: ReactNode,
  config: ITonConnectionConfig;
}) => {
  return (
    <TonConnectUIProvider {...config as any} >
      {children}
    </TonConnectUIProvider>
  )
}