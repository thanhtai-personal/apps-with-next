import {
  RoleCreation,
  RoleFilter,
  RoleResponse,
  RoleUpdating,
} from "../../types";
import { BaseRoutes, Pagination, IResponse } from "@core-sdk/core";

export interface RoleRoutes extends BaseRoutes {
  "/roles": {
    get: {
      request: {
        query: RoleFilter;
      };
      responses: {
        "200": IResponse<Pagination<RoleResponse>>;
      };
    };
    post: {
      request: {
        query: RoleCreation;
      };
      responses: {
        "200": IResponse<RoleResponse>;
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
        "200": IResponse<RoleResponse>;
      };
    };
    put: {
      request: {
        params: {
          roleId: string | number;
        };
        body: RoleUpdating;
      };
      responses: {
        "200": IResponse<RoleResponse>;
      };
    };
    delete: {
      request: {
        params: {
          roleId: string | number;
        };
      };
      responses: {
        "200": IResponse<string>;
      };
    };
  };
}
