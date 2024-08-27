import { IAppWithRoute, ReactApplicationManager } from "@core-ui/react-core";
import buildinFeatures from "@/features/index";
import allProviders from "./providers/index";
import { App } from "./App";
import { singleRoutes } from "./appRoute";
import { disabledStrictMode } from "@core-ui/react-mobx-state"

let reactApp = ReactApplicationManager.getInstance({
  rootId: "root",
  providers: [],
  strictMode: false,
  router: singleRoutes,
} as unknown as IAppWithRoute);

// App feature area
if (buildinFeatures) {
  buildinFeatures.forEach(
    (
      feat: (appManager: ReactApplicationManager) => ReactApplicationManager,
    ) => {
      reactApp = feat(reactApp);
    },
  );
}

// App providers area (A provider is a HOC component, which wrapped your application main components (all of your router))
reactApp.addProviders(allProviders || []);
reactApp.addProvider(App);

// Render your app into root element here!
disabledStrictMode();
reactApp.start();