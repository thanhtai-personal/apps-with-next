import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IAPIResponse } from "@core-sdk/core";
import {
  AuthRoutes,
} from "../types";
import { ILoginRequest, IRegisterRequest, IResetPasswordRequest } from "@core-ui/ums-types";

export class AuthService
  extends BaseService<AuthRoutes>
  implements IAbstractService<any, any, any, any> {
  constructor(api: FetchApi<AuthRoutes>) {
    super(api);
  }

  create = (createData: any) => {
    throw new Error("function not implemented");
  }

  update = (
    id: string | number,
    updateData: any,
  ) => {
    throw new Error("function not implemented");
  }

  patchUpdate = (
    id: string | number,
    updateData: any,
  ) => {
    throw new Error("function not implemented");
  }

  getOne = (id: string | number) => {
    throw new Error("function not implemented");
  }

  getMany = (filter: any) => {
    throw new Error("function not implemented");
  }

  delete = (
    id: string | number,
  ) => {
    throw new Error("function not implemented");
  }

  validateToken = () => {
    return this.api.get("/auth", {}) as Promise<APIResult<IAPIResponse<any>>>;
  }

  login = (data: ILoginRequest) => {
    return this.api.post("/auth/login", {}, data) as Promise<APIResult<IAPIResponse<any>>>;
  }

  register = (data: IRegisterRequest) => {
    return this.api.post("/auth/register", {}, data) as Promise<APIResult<IAPIResponse<any>>>;
  }

  resetPassword = (data: IResetPasswordRequest) => {
    return this.api.post("/auth/reset-password", {}, data) as Promise<APIResult<IAPIResponse<any>>>;

  }

  logout = () => {
    return this.api.post("/auth/logout", {}, {}) as Promise<APIResult<IAPIResponse<any>>>;
  }

  refreshToken = () => {
    return this.api.post("/auth/refresh-token", {}, {}) as Promise<APIResult<IAPIResponse<any>>>;
  }
}
