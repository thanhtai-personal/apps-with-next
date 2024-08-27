import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IPagingFilter, IResponse, Pagination } from "@core-sdk/core";
import {
  UserRoutes,
} from "../types";
import { IPagination, IUserCreation, IUserFilter, IUserResponse, IUserUpdating } from "@core-ui/goat-tap-types";

export class UserService
  extends BaseService<UserRoutes>
  implements IAbstractService<IUserCreation, IUserUpdating, IUserResponse, IPagingFilter & IUserFilter> {
  constructor(api: FetchApi<UserRoutes>) {
    super(api);
  }
  create(createData: IUserCreation): Promise<APIResult<IResponse<IUserResponse>>> {
    return this.api.post("/users", {}, createData) as Promise<
      APIResult<IResponse<IUserResponse>>
    >;
  }
  update(
    id: string | number,
    updateData: IUserUpdating,
  ): Promise<APIResult<IResponse<IUserResponse>>> {
    return this.api.put("/users/{userId}", { userId: id }, updateData) as Promise<
      APIResult<IResponse<IUserResponse>>
    >;
  }

  patchUpdate(
    userId: string | number,
    updateData: Partial<IUserUpdating>
  ): Promise<APIResult<IResponse<IUserResponse>>> {
    return this.api.patch("/users/{userId}", { userId }, updateData) as Promise<
      APIResult<IResponse<IUserResponse>>
    >;
  }

  updatePoints(
    userId: string | number,
    points: number,
  ): Promise<APIResult<IResponse<IUserResponse>>> {
    return this.api.patch("/users/{userId}/points", { userId }, { points: Number(points) }) as Promise<
      APIResult<IResponse<IUserResponse>>
    >;
  }
  
  updateEnergy(
    userId: string | number,
    energy: number,
  ): Promise<APIResult<IResponse<IUserResponse>>> {
    return this.api.patch("/users/{userId}/energy", { userId }, { energy }) as Promise<
      APIResult<IResponse<IUserResponse>>
    >;
  }

  getOne(id: string | number): Promise<APIResult<IResponse<IUserResponse>>> {
    return this.api.get("/users/{userId}", { userId: id }) as Promise<APIResult<IResponse<IUserResponse>>>;
  }

  getMany(filter: IPagingFilter & IUserFilter): Promise<APIResult<IResponse<Pagination<IUserResponse>>>> {
    return this.api.get("/users", filter) as Promise<
      APIResult<IResponse<Pagination<IUserResponse>>>
    >;
  }
  delete(
    id: string | number,
  ): Promise<APIResult<IResponse<void>>> {
    return this.api.delete("/users/{userId}", { userId: id }) as Promise<
      APIResult<IResponse<void>>
    >;
  }
}
