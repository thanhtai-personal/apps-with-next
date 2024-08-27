import { ReactNode } from "react";
import { IRouter, IAppWithRoute, AppRouter, AppBrowserRouter } from "./appRoute";
import { IAppProvider, ReactApp } from "./dom";


// Class representing a React application manager
export class ReactApplicationManager {
  private static instance: ReactApplicationManager | null = null;
  private providers?: React.FC<IAppProvider>[]; // Optional array of providers
  private rootId: string = "root"; // Default root ID for rendering
  private router: IRouter[] | ReactNode | ReactNode[]; // Array of router configurations defining application routes
  private strictMode: boolean = true; // Flag indicating whether to use React StrictMode
  private isBrowserRouter?: boolean = false;
  private createAppBrowserRouter?: (routers: ReactNode[]) => ReactNode;

  private constructor(props: IAppWithRoute) {
    // Initialize class properties based on provided props
    this.providers = props.providers || []; // Set providers or default to an empty array
    this.rootId = props.rootId || "root"; // Set root ID or default to "root"
    this.strictMode = Boolean(props.strictMode) ? this.strictMode : false; // Set strictMode based on provided props
    this.router = props.router || []; // Set router configurations or default to an empty array
    this.isBrowserRouter = props.isBrowserRouter;
    this.createAppBrowserRouter = props.createAppBrowserRouter;
  }

  public static getInstance(props: IAppWithRoute) {
    if (!this.instance) {
      this.instance = new ReactApplicationManager(props);
    }
    return this.instance;
  }

  // Method to add a single provider entry
  addProvider = (provider: React.FC<IAppProvider>) => {
    this.providers = [...(this.providers || []), provider]; // Add a new provider to the 'provider' array
  };

  // Method to add multiple provider entries
  addProviders = (providers: React.FC<IAppProvider>[]) => {
    this.providers = [...(this.providers || []), ...providers]; // Concatenate new providers to the 'provider' array
  };

  // Method to add a single router entry
  addRoute = (router: IRouter | ReactNode) => {
    if (this.isBrowserRouter) {
      if (this.createAppBrowserRouter && typeof this.createAppBrowserRouter === 'function') {
        return this.router = [router as ReactNode, ...(this.router as ReactNode[])] as ReactNode[]
      }
      return this.router;
    }
    this.router = [router as IRouter, ...this.router as IRouter[]]; // Add a new router to the 'router' array
  };

  // Method to add multiple router entries
  addRoutes = (routers: IRouter[] | ReactNode[]) => {
    if (this.isBrowserRouter) {
      if (this.createAppBrowserRouter && typeof this.createAppBrowserRouter === 'function') {
        return this.router = [...routers as ReactNode[], ...(this.router as ReactNode[])]
      }
      return this.router;
    }
    this.router = [...routers as IRouter[], ...this.router as IRouter[]]; // Concatenate new routers to the 'router' array
  };

  // Method to remove a router entry at a specified index
  removeRoutes = (routers: IRouter[]) => {
    if (this.isBrowserRouter) {
      return;
    }
    // Make a copy of the current router array
    const updatedRouter = [...this.router as IRouter[]];

    // Iterate over each route to be removed
    routers.forEach((routeToRemove) => {
      // Find the index of the route to remove in the updatedRouter array
      const index = updatedRouter.findIndex(
        (route) =>
          route.path === routeToRemove.path,
      );

      // Check if the route was found in the array
      if (index !== -1) {
        // Remove the route at the found index using splice
        updatedRouter.splice(index, 1);
      } else {
        console.error(
          `Route not found: ${routeToRemove.path}. No route removed.`,
        );
      }
    });

    // Update the 'router' property with the updated array
    this.router = updatedRouter;

    // Alternatively, if 'router' is a state in a React component, you would update the state here
  };

  stop = () => {
    const rootElement = document.getElementById(this.rootId);

    if (rootElement) {
      // Check if the root element has any child nodes
      while (rootElement.firstChild) {
        // Remove the first child node of the root element
        rootElement.removeChild(rootElement.firstChild);
      }
    } else {
      console.warn(`Root element with ID '${this.rootId}' not found.`);
    }
  };

  // Method to start the React application
  start = () => {
    // Render the React application using ReactApp function from '../dom'
    ReactApp({
      strictMode: this.strictMode, // Pass strictMode flag
      providers: this.providers, // Pass providers array
      rootId: this.rootId, // Pass root ID for rendering
      renderedApp: this.isBrowserRouter ?
        this.createAppBrowserRouter && typeof this.createAppBrowserRouter === "function" ?
          this.createAppBrowserRouter(this.router as ReactNode[])
          : this.router as ReactNode
        : <AppRouter router={this.router as IRouter[]} />, // Pass AppRouter component with 'router' prop
    })
  };

  restart = () => {
    this.stop();
    this.start();
  };
};