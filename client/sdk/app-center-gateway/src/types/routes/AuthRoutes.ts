import { BaseRoutes, IAPIResponse } from "@core-sdk/core";
import { ILoginRequest, IRegisterRequest, IResetPasswordRequest } from "@core-ui/ums-types";

export interface AuthRoutes extends BaseRoutes {
  "/auth": {
    get: {
      request: {
      };
      responses: {
        "200": IAPIResponse<any>;
      };
    };
  };
  
  "/auth/login": {
    post: {
      request: {
        query: ILoginRequest;
      };
      responses: {
        "200": IAPIResponse<any>;
      };
    };
  };

  "/auth/register": {
    post: {
      request: {
        query: IRegisterRequest;
      };
      responses: {
        "200": IAPIResponse<any>;
      };
    };
  };

  "/auth/refresh-token": {
    post: {
      request: {
      };
      responses: {
        "200": IAPIResponse<any>;
      };
    };
  };

  "/auth/logout": {
    post: {
      request: {
      };
      responses: {
        "200": IAPIResponse<any>;
      };
    };
  };

  "/auth/reset-password": {
    post: {
      request: {
        query: IResetPasswordRequest;
      };
      responses: {
        "200": IAPIResponse<any>;
      };
    };
  };
  
}
