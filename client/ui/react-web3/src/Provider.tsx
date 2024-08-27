import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";
import { MetamaskConnectionContext } from "./context";

export interface IMetamaskProvider {
  children: React.ReactNode;
}

export const ConnectionProvider = ({ children }: IMetamaskProvider) => {
  const { config } = MetamaskConnectionContext.useDataContext() || {};

  const appConfig = {
    dappMetadata: {
      name: "Unknown React Dapp",
      url: window.location.href,
    },
    ...(config || {})
  }

  return (
    <MetaMaskUIProvider sdkOptions={appConfig}>
      {children}
    </MetaMaskUIProvider>
  )
}