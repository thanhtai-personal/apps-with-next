import { BaseRoutes, IResponse } from "@core-sdk/core";
import { IAuthResponse } from "@core-ui/goat-tap-types";

export interface AuthRoutes extends BaseRoutes {
  "/auth/login": {
    post: {
      request: {
        body: any;
      };
      responses: {
        "200": IResponse<IAuthResponse>;
      };
    };
  };
  "/auth": {
    get: {
      request: {};
      responses: {
        "200": IResponse<IAuthResponse>;
      };
    };
  };
}
