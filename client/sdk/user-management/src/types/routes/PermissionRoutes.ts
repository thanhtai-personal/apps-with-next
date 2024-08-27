import {
  PermissionCreation,
  PermissionFilter,
  PermissionResponse,
  PermissionUpdating,
} from "../../types";
import { BaseRoutes, Pagination, IResponse } from "@core-sdk/core";

export interface PermissionRoutes extends BaseRoutes {
  "/permissions": {
    get: {
      request: {
        query: PermissionFilter;
      };
      responses: {
        "200": IResponse<Pagination<PermissionResponse>>;
      };
    };
    post: {
      request: {
        query: PermissionCreation;
      };
      responses: {
        "200": IResponse<PermissionResponse>;
      };
    };
  };
  "/permissions/{permissionId}": {
    get: {
      request: {
        params: {
          permissionId: string | number;
        };
      };
      responses: {
        "200": IResponse<PermissionResponse>;
      };
    };
    put: {
      request: {
        params: {
          permissionId: string | number;
        };
        body: PermissionUpdating;
      };
      responses: {
        "200": IResponse<PermissionResponse>;
      };
    };
    delete: {
      request: {
        params: {
          permissionId: string | number;
        };
      };
      responses: {
        "200": IResponse<string>;
      };
    };
  };
}
