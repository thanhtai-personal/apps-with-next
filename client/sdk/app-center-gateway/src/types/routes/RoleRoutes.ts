import { BaseRoutes, IAPIResponse } from "@core-sdk/core";
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types";
import {
  IRoleCreation, IRoleFilter
  , IRoleResponse, IRoleUpdating,
} from "@core-ui/ums-types";

export interface RoleRoutes extends BaseRoutes {
  "/roles": {
    get: {
      request: {
        query: IRoleFilter;
      };
      responses: {
        "200": IAPIResponse<IPagingResponse<IRoleResponse>>;
      };
    };
    post: {
      request: {
        query: IRoleCreation;
      };
      responses: {
        "200": IAPIResponse<IRoleResponse>;
      };
    };
  };

  "/roles/all": {
    get: {
      request: {
        query: IRoleFilter;
      };
      responses: {
        "200": INonPagingResponse<IRoleResponse>;
      };
    };
  };

  "/roles/{roleId}": {
    get: {
      request: {
        params: {
          roleId: string | number;
        };
      };
      responses: {
        "200": IAPIResponse<IRoleResponse>;
      };
    };
    put: {
      request: {
        params: {
          roleId: string | number;
        };
        body: IRoleUpdating;
      };
      responses: {
        "200": IAPIResponse<IRoleResponse>;
      };
    };
    delete: {
      request: {
        params: {
          roleId: string | number;
        };
      };
      responses: {
        "200": IAPIResponse<string>;
      };
    };
    patch: {
      request: {
        params: {
          roleId: string | number;
        };
        body: Partial<IRoleUpdating>;
      };
      responses: {
        "200": IAPIResponse<IRoleResponse>;
      };
    };
  };
}
