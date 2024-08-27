import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IResponse, Pagination } from "@core-sdk/core";
import {
  RoleCreation,
  RoleFilter,
  RoleResponse,
  RoleRoutes,
  RoleUpdating,
} from "../types";

export class RoleService
  extends BaseService<RoleRoutes>
  implements IAbstractService<RoleCreation, RoleUpdating, RoleResponse, RoleFilter> {
  constructor(api: FetchApi<RoleRoutes>) {
    super(api);
  }
  create(createData: RoleCreation): Promise<APIResult<IResponse<RoleResponse>>> {
    return this.api.post("/roles", {}, createData) as Promise<
      APIResult<IResponse<RoleResponse>>
    >;
  }
  update(
    id: string | number,
    updateData: RoleUpdating,
  ): Promise<APIResult<IResponse<RoleResponse>>> {
    return this.api.put("/roles/{roleId}", id, updateData) as Promise<
      APIResult<IResponse<RoleResponse>>
    >;
  }
  getOne(id: string | number): Promise<APIResult<IResponse<RoleResponse>>> {
    return this.api.get("/roles/{roleId}", id) as Promise<APIResult<IResponse<RoleResponse>>>;
  }
  getMany(filter: RoleFilter): Promise<APIResult<IResponse<Pagination<RoleResponse>>>> {
    return this.api.get("/roles", filter) as Promise<
      APIResult<IResponse<Pagination<RoleResponse>>>
    >;
  }
  delete(
    id: string | number,
  ): Promise<APIResult<IResponse<void>>> {
    return this.api.delete("/roles/{roleId}", id) as Promise<
      APIResult<IResponse<void>>
    >;
  }
}
