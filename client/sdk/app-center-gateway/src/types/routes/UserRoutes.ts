import { BaseRoutes, IAPIResponse } from "@core-sdk/core";
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types";
import {
  IUserCreation, IUserFilter
  , IUserResponse, IUserUpdating,
} from "@core-ui/ums-types";

export interface UserRoutes extends BaseRoutes {
  "/users": {
    get: {
      request: {
        query: IUserFilter;
      };
      responses: {
        "200": IAPIResponse<IPagingResponse<IUserResponse>>;
      };
    };
    post: {
      request: {
        query: IUserCreation;
      };
      responses: {
        "200": IAPIResponse<IUserResponse>;
      };
    };
  };

  "/users/all": {
    get: {
      request: {
        query: IUserFilter;
      };
      responses: {
        "200": INonPagingResponse<IUserResponse>;
      };
    };
  };

  "/users/{userId}": {
    get: {
      request: {
        params: {
          userId: string | number;
        };
      };
      responses: {
        "200": IAPIResponse<IUserResponse>;
      };
    };
    put: {
      request: {
        params: {
          userId: string | number;
        };
        body: IUserUpdating;
      };
      responses: {
        "200": IAPIResponse<IUserResponse>;
      };
    };
    delete: {
      request: {
        params: {
          userId: string | number;
        };
      };
      responses: {
        "200": IAPIResponse<string>;
      };
    };
    patch: {
      request: {
        params: {
          userId: string | number;
        };
        body: Partial<IUserUpdating>;
      };
      responses: {
        "200": IAPIResponse<IUserResponse>;
      };
    };
  };
}
