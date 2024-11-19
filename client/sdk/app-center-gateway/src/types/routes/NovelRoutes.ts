import { BaseRoutes, IAPIResponse } from "@core-sdk/core";
import { IPagingResponse, INonPagingResponse } from "@core-ui/common-types"
import {
  INovelCreation, INovelFilter
  , INovelResponse, INovelUpdating,
} from "@core-ui/novels-types";

export interface NovelRoutes extends BaseRoutes {
  "/novels": {
    get: {
      request: {
        query: INovelFilter;
      };
      responses: {
        "200": IPagingResponse<INovelResponse>;
      };
    };
    post: {
      request: {
        query: INovelCreation;
      };
      responses: {
        "200": IAPIResponse<INovelResponse>;
      };
    };
  };

  "/novels/all": {
    get: {
      request: {
        query: INovelFilter;
      };
      responses: {
        "200": INonPagingResponse<INovelResponse>;
      };
    };
  };

  "/novels/{novelId}": {
    get: {
      request: {
        params: {
          novelId: string | number;
        };
      };
      responses: {
        "200": IAPIResponse<INovelResponse>;
      };
    };
    put: {
      request: {
        params: {
          novelId: string | number;
        };
        body: INovelUpdating;
      };
      responses: {
        "200": IAPIResponse<INovelResponse>;
      };
    };
    delete: {
      request: {
        params: {
          novelId: string | number;
        };
      };
      responses: {
        "200": IAPIResponse<string>;
      };
    };
    patch: {
      request: {
        params: {
          novelId: string | number;
        };
        body: Partial<INovelUpdating>;
      };
      responses: {
        "200": IAPIResponse<INovelResponse>;
      };
    };
  };
}
