import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";

export interface IAppProvider {
  children: ReactNode | JSX.Element;
}

export interface IReactApp {
  rootId?: string;
  renderedApp: JSX.Element | ReactNode;
  providers?: React.FC<IAppProvider>[];
  strictMode?: boolean;
}

export type ProviderType = React.FC<IAppProvider>;

export const ReactApp = ({
  rootId = "root",
  renderedApp,
  providers = [],
  strictMode = true,
}: IReactApp) => {
  const AppWithProvider = providers.reduce(
    (appNode: ReactNode | JSX.Element, ProviderComponent: ProviderType) => {
      return <ProviderComponent>{appNode}</ProviderComponent>;
    },
    renderedApp,
  );

  ReactDOM.createRoot(document.getElementById(rootId)!).render(
    strictMode ? <React.StrictMode>{AppWithProvider}</React.StrictMode> : AppWithProvider,
  )
};
