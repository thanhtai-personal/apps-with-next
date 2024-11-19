import { BaseRoutes, IAPIResponse } from "@core-sdk/core";
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types";
import {
  IPermissionCreation, IPermissionFilter
  , IPermissionResponse, IPermissionUpdating,
} from "@core-ui/ums-types";

export interface PermissionRoutes extends BaseRoutes {
  "/permissions": {
    get: {
      request: {
        query: IPermissionFilter;
      };
      responses: {
        "200": IAPIResponse<IPagingResponse<IPermissionResponse>>;
      };
    };
    post: {
      request: {
        query: IPermissionCreation;
      };
      responses: {
        "200": IAPIResponse<IPermissionResponse>;
      };
    };
  };

  "/permissions/all": {
    get: {
      request: {
        query: IPermissionFilter;
      };
      responses: {
        "200": INonPagingResponse<IPermissionResponse>;
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
        "200": IAPIResponse<IPermissionResponse>;
      };
    };
    put: {
      request: {
        params: {
          permissionId: string | number;
        };
        body: IPermissionUpdating;
      };
      responses: {
        "200": IAPIResponse<IPermissionResponse>;
      };
    };
    delete: {
      request: {
        params: {
          permissionId: string | number;
        };
      };
      responses: {
        "200": IAPIResponse<string>;
      };
    };
    patch: {
      request: {
        params: {
          permissionId: string | number;
        };
        body: Partial<IPermissionUpdating>;
      };
      responses: {
        "200": IAPIResponse<IPermissionResponse>;
      };
    };
  };
}
