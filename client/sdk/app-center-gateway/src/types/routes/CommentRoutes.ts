import { BaseRoutes, IAPIResponse } from "@core-sdk/core";
import { IPagingResponse, INonPagingResponse } from "@core-ui/common-types"
import {
  ICommentCreation, ICommentFilter
  , ICommentResponse, ICommentUpdating,
} from "@core-ui/novels-types";

export interface NovelsCommentRoutes extends BaseRoutes {
  "/comments": {
    get: {
      request: {
        query: ICommentFilter;
      };
      responses: {
        "200": IPagingResponse<ICommentResponse>;
      };
    };
    post: {
      request: {
        query: ICommentCreation;
      };
      responses: {
        "200": IAPIResponse<ICommentResponse>;
      };
    };
  };

  "/comments/all": {
    get: {
      request: {
        query: ICommentFilter;
      };
      responses: {
        "200": INonPagingResponse<ICommentResponse>;
      };
    };
  };

  "/comments/{commentId}": {
    get: {
      request: {
        params: {
          commentId: string | number;
        };
      };
      responses: {
        "200": IAPIResponse<ICommentResponse>;
      };
    };
    put: {
      request: {
        params: {
          commentId: string | number;
        };
        body: ICommentUpdating;
      };
      responses: {
        "200": IAPIResponse<ICommentResponse>;
      };
    };
    delete: {
      request: {
        params: {
          commentId: string | number;
        };
      };
      responses: {
        "200": IAPIResponse<string>;
      };
    };
    patch: {
      request: {
        params: {
          commentId: string | number;
        };
        body: Partial<ICommentUpdating>;
      };
      responses: {
        "200": IAPIResponse<ICommentResponse>;
      };
    };
  };
}
