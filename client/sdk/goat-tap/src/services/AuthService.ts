import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IResponse, Pagination } from "@core-sdk/core";
import { AuthRoutes } from "../types";
import { IAuthResponse } from "@core-ui/goat-tap-types";

export class AuthService
  extends BaseService<AuthRoutes>
  implements IAbstractService<any, any, IAuthResponse, any> {
  constructor(api: FetchApi<AuthRoutes>) {
    super(api);
  }

  login({ telegramId, referralParams }: any): Promise<APIResult<IResponse<IAuthResponse>>> {
    return this.api.post("/auth/login", {
      telegramId,
      referralParams
    }) as Promise<
      APIResult<IResponse<IAuthResponse>>
    >;
  }

  auth(): Promise<APIResult<IResponse<IAuthResponse>>> {
    return this.api.get("/auth", {}) as Promise<
      APIResult<IResponse<IAuthResponse>>
    >;
  }

  getMany(filter: any): Promise<APIResult<IResponse<Pagination<IAuthResponse>>>> {
    throw new Error("Not implemented");
  }

  getOne(id: string | number): Promise<APIResult<IResponse<IAuthResponse>>> {
    throw new Error("Not implemented");
  }

  create(createData: any): Promise<APIResult<IResponse<IAuthResponse>>> {
    throw new Error("Not implemented");
  }

  update(id: string | number, updateData: any): Promise<APIResult<IResponse<IAuthResponse>>> {
    throw new Error("Not implemented");
  }

  patchUpdate(id: string | number, updateData: any): Promise<APIResult<IResponse<any>>> {
    throw new Error("Not implemented");
  }

  delete(id: string | number): Promise<APIResult<IResponse<void>>> {
    throw new Error("Not implemented");
  }
}
