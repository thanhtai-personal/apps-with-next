import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IResponse, Pagination } from "@core-sdk/core";
import {
  EmailUpdatingBody,
  PasswordUpdatingBody,
  RolesAssigningBody,
  UserCreation,
  UserFilter,
  UserResponse,
  UserRoutes,
  UserUpdating,
} from "../types";

export class UserService
  extends BaseService<UserRoutes>
  implements IAbstractService<UserCreation, UserUpdating, UserResponse, UserFilter> {
  constructor(api: FetchApi<UserRoutes>) {
    super(api);
  }
  create(createData: UserCreation): Promise<APIResult<IResponse<UserResponse>>> {
    return this.api.post("/users", {}, createData) as Promise<
      APIResult<IResponse<UserResponse>>
    >;
  }
  update(
    id: string | number,
    updateData: UserUpdating,
  ): Promise<APIResult<IResponse<UserResponse>>> {
    return this.api.put("/users/{userId}", id, updateData) as Promise<
      APIResult<IResponse<UserResponse>>
    >;
  }
  getOne(id: string | number): Promise<APIResult<IResponse<UserResponse>>> {
    return this.api.get("/users/{userId}", id) as Promise<APIResult<IResponse<UserResponse>>>;
  }
  getMany(filter: UserFilter): Promise<APIResult<IResponse<Pagination<UserResponse>>>> {
    return this.api.get("/users", filter) as Promise<
      APIResult<IResponse<Pagination<UserResponse>>>
    >;
  }
  delete(
    id: string | number,
  ): Promise<APIResult<IResponse<void>>> {
    return this.api.delete("/users/{userId}", id) as Promise<
      APIResult<IResponse<void>>
    >;
  }
  assignRole(
    id: string | number,
    updateData: RolesAssigningBody
  ): Promise<APIResult<IResponse<UserResponse>>> {
    return this.api.put("/users/{userId}/attributes/roles", id, updateData) as Promise<
      APIResult<IResponse<UserResponse>>
    >;
  }
  updateEmail(
    id: string | number,
    updateData: EmailUpdatingBody
  ): Promise<APIResult<IResponse<UserResponse>>> {
    return this.api.put("/users/{userId}/attributes/email", id, updateData) as Promise<
      APIResult<IResponse<UserResponse>>
    >;
  }
  updatePassword(
    id: string | number,
    updateData: PasswordUpdatingBody
  ): Promise<APIResult<IResponse<UserResponse>>> {
    return this.api.put("/users/{userId}/attributes/password", id, updateData) as Promise<
      APIResult<IResponse<UserResponse>>
    >;
  }
}
