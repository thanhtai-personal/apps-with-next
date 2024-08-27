import { BaseRoutes, IResponse } from "@core-sdk/core";

export interface TonRoutes extends BaseRoutes {
  "/ton/token-transfered": {
    get: {
      request: {
        query: any;
      };
      responses: {
        "200": IResponse<any>;
      };
    };
  },
}
