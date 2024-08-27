import { ReactNode } from "react"
import { ReactApplicationManager } from "@core-ui/react-core";
import { ConnectionProvider } from "./Provider";
import { MetamaskConnectionContext } from "./context";

export class Web3ConnectionManager {
  private static instance: Web3ConnectionManager | null = null;
  private ethereum: any;
  private config: any;

  private constructor(config: any) {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      this.ethereum = window.ethereum;
      this.config = config;
    } else {
      console.log("MetaMask was not installed!");
    }
  }

  public static getInstance(config?: any): Web3ConnectionManager {
    if (this.instance === null) {
      this.instance = new Web3ConnectionManager(config);
    }

    return this.instance;
  }

  request = (method: string, address: string, params: string[] = ["lastest"]) => {
    // Requesting balance method
    this.ethereum
      .request({
        method: method,
        params: [address, ...params],
      })
  };

  inject = (reactManager: ReactApplicationManager) => {
    reactManager.addProvider(({ children }: { children: ReactNode }) => {
      return (
        <MetamaskConnectionContext.Provider value={{ config: this.config }}>
          {children}
        </MetamaskConnectionContext.Provider>
      )
    });
    reactManager.addProvider(ConnectionProvider);
    return reactManager;
  }
}

export default Web3ConnectionManager