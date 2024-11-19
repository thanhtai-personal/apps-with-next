import { BaseRoutes, IAPIResponse } from "@core-sdk/core";

export interface CrawlerRoutes extends BaseRoutes {
  "/crawler/anidays": {
    post: {
      request: {
      };
      responses: {
        "200": IAPIResponse<any>;
      };
    };
  };

  "/crawler/tangthuvien": {
    post: {
      request: {
      };
      responses: {
        "200": IAPIResponse<any>;
      };
    };
  };
}
