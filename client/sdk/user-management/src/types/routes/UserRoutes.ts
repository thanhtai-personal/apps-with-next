import {
  UserCreation,
  UserFilter,
  UserResponse,
  UserUpdating,
  RolesAssigningBody,
  EmailUpdatingBody,
  PasswordUpdatingBody
} from "../../types";
import { BaseRoutes, Pagination, IResponse } from "@core-sdk/core";

export interface UserRoutes extends BaseRoutes {
  "/users": {
    get: {
      request: {
        query: UserFilter;
      };
      responses: {
        "200": IResponse<Pagination<UserResponse>>;
      };
    };
    post: {
      request: {
        query: UserCreation;
      };
      responses: {
        "200": IResponse<UserResponse>;
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
        "200": IResponse<UserResponse>;
      };
    };
    put: {
      request: {
        params: {
          userId: string | number;
        };
        body: UserUpdating;
      };
      responses: {
        "200": IResponse<UserResponse>;
      };
    };
    delete: {
      request: {
        params: {
          userId: string | number;
        };
      };
      responses: {
        "200": IResponse<string>;
      };
    };
  };
  "/users/{userId}/attributes/roles": {
    put: {
      request: {
        params: {
          userId: string | number;
        };
        body: RolesAssigningBody;
      };
      responses: {
        "200": IResponse<UserResponse>;
      };
    };
  };
  "/users/{userId}/attributes/password": {
    put: {
      request: {
        params: {
          userId: string | number;
        };
        body: PasswordUpdatingBody;
      };
      responses: {
        "200": IResponse<UserResponse>;
      };
    };
  };
  "/users/{userId}/attributes/email": {
    put: {
      request: {
        params: {
          userId: string | number;
        };
        body: EmailUpdatingBody;
      };
      responses: {
        "200": IResponse<UserResponse>;
      };
    };
  };
}
