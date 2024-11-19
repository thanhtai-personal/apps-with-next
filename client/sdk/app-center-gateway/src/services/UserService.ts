import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IAPIResponse } from "@core-sdk/core";
import {
  UserRoutes,
} from "../types";
import { IUserCreation, IUserFilter, IUserResponse, IUserUpdating } from "@core-ui/ums-types";
import { INonPagingResponse, IPagingResponse, ISearchQuery } from "@core-ui/common-types";

export class UserService
  extends BaseService<UserRoutes>
  implements IAbstractService<IUserCreation, IUserUpdating, IUserResponse, ISearchQuery<IUserFilter>> {
  constructor(api: FetchApi<UserRoutes>) {
    super(api);
  }
  create(createData: IUserCreation): Promise<APIResult<IAPIResponse<IUserResponse>>> {
    return this.api.post("/users", {}, createData) as Promise<
      APIResult<IAPIResponse<IUserResponse>>
    >;
  }
  update(
    id: string | number,
    updateData: IUserUpdating,
  ): Promise<APIResult<IAPIResponse<IUserResponse>>> {
    return this.api.put("/users/{userId}", { userId: id }, updateData) as Promise<
      APIResult<IAPIResponse<IUserResponse>>
    >;
  }

  patchUpdate(
    userId: string | number,
    updateData: Partial<IUserUpdating>
  ): Promise<APIResult<IAPIResponse<IUserResponse>>> {
    return this.api.patch("/users/{userId}", { userId }, updateData) as Promise<
      APIResult<IAPIResponse<IUserResponse>>
    >;
  }

  getOne(id: string | number): Promise<APIResult<IAPIResponse<IUserResponse>>> {
    return this.api.get("/users/{userId}", { userId: id }) as Promise<APIResult<IAPIResponse<IUserResponse>>>;
  }

  getMany(filter: ISearchQuery<IUserFilter>): Promise<APIResult<IAPIResponse<IPagingResponse<IUserResponse>>>> {
    return this.api.get("/users", filter) as Promise<
      APIResult<IAPIResponse<IPagingResponse<IUserResponse>>>
    >;
  }

  getAll(filter: ISearchQuery<IUserFilter>): Promise<APIResult<IAPIResponse<INonPagingResponse<IUserResponse>>>> {
    return this.api.get("/users/all", filter || {}) as Promise<
      APIResult<IAPIResponse<INonPagingResponse<IUserResponse>>>
    >;
  }
  delete(
    id: string | number,
  ): Promise<APIResult<IAPIResponse<void>>> {
    return this.api.delete("/users/{userId}", { userId: id }) as Promise<
      APIResult<IAPIResponse<void>>
    >;
  }
}
