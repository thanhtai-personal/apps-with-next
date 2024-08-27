import { BaseRoutes, IResponse } from "@core-sdk/core";

export interface SummaryRoutes extends BaseRoutes {
  "/summary/tap": {
    get: {
      request: {};
      responses: {
        "200": IResponse<any>;
      };
    };
  };
}
