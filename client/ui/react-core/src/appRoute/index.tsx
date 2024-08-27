import { ReactNode } from "react";
import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom";
import { IReactApp } from "../dom";

// Define the structure of a single router entry
export interface IRouter {
  path: string;
  element: ReactNode;
}

// Interface extending IReactApp by adding a 'router' property
export interface IAppWithRoute extends Omit<IReactApp, "App"> {
  router: IRouter[] | ReactNode; // Array of IRouter objects defining routes
  isBrowserRouter?: boolean;
  createAppBrowserRouter: () => ReactNode;
}

// Props interface for AppRouter component
export interface IAppRouteProps {
  router: IRouter[]; // Array of IRouter objects defining routes
}

// Function to create a BrowserRouter based on provided router configuration
export const buildAppRoute: (router: IRouter[]) => any = (router: IRouter[]) =>
  createBrowserRouter(router);

// Functional component representing the application router
export const AppRouter: React.FC<IAppRouteProps> = ({ router }) => {
  const _router = buildAppRoute(router); // Create BrowserRouter instance based on provided router
  return <RouterProvider router={_router} />; // Render RouterProvider with created BrowserRouter
};

export const AppBrowserRouter = ({ children }: { children: React.ReactNode }) => {
  return <BrowserRouter>
    {children}
  </BrowserRouter>
}
