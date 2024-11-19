import { BaseRoutes, IAPIResponse } from "@core-sdk/core";
import { IPagingResponse, INonPagingResponse } from "@core-ui/common-types"
import {
  IAuthorCreation, IAuthorFilter
  , IAuthorResponse, IAuthorUpdating,
} from "@core-ui/novels-types";

export interface AuthorRoutes extends BaseRoutes {
  "/authors": {
    get: {
      request: {
        query: IAuthorFilter;
      };
      responses: {
        "200": IPagingResponse<IAuthorResponse>;
      };
    };
    post: {
      request: {
        query: IAuthorCreation;
      };
      responses: {
        "200": IAPIResponse<IAuthorResponse>;
      };
    };
  };

  "/authors/all": {
    get: {
      request: {
        query: IAuthorFilter;
      };
      responses: {
        "200": INonPagingResponse<IAuthorResponse>;
      };
    };
  };

  "/authors/{authorId}": {
    get: {
      request: {
        params: {
          authorId: string | number;
        };
      };
      responses: {
        "200": IAPIResponse<IAuthorResponse>;
      };
    };
    put: {
      request: {
        params: {
          authorId: string | number;
        };
        body: IAuthorUpdating;
      };
      responses: {
        "200": IAPIResponse<IAuthorResponse>;
      };
    };
    delete: {
      request: {
        params: {
          authorId: string | number;
        };
      };
      responses: {
        "200": IAPIResponse<string>;
      };
    };
    patch: {
      request: {
        params: {
          authorId: string | number;
        };
        body: Partial<IAuthorUpdating>;
      };
      responses: {
        "200": IAPIResponse<IAuthorResponse>;
      };
    };
  };
}
