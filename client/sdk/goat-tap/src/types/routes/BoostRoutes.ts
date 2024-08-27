import { BaseRoutes, IResponse } from "@core-sdk/core";
import { BoostType, IBoostCreation, IBoostResponse, IBoostUpdate } from "@core-ui/goat-tap-types";

export interface BoostRoutes extends BaseRoutes {
  "/boosts": {
    post: {
      request: {
        query: IBoostCreation;
      };
      responses: {
        "200": IResponse<IBoostResponse>;
      };
    };
  },
  "/boosts/{boostId}": {
    patch: {
      request: {
        params: {
          boostId: string | number;
        };
        body: Partial<IBoostUpdate>;
      };
      responses: {
        "200": IResponse<IBoostResponse>;
      };
    };
  },
  "/boosts/buy": {
    post: {
      request: {
        query: { boostType: BoostType };
      };
      responses: {
        "200": IResponse<IBoostResponse>;
      };
    };
  }
}
