import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IResponse, Pagination } from "@core-sdk/core";
import {
  PermissionCreation,
  PermissionFilter,
  PermissionResponse,
  PermissionRoutes,
  PermissionUpdating,
} from "../types";

export class PermissionService
  extends BaseService<PermissionRoutes>
  implements IAbstractService<PermissionCreation, PermissionUpdating, PermissionResponse, PermissionFilter> {
  constructor(api: FetchApi<PermissionRoutes>) {
    super(api);
  }
  create(createData: PermissionCreation): Promise<APIResult<IResponse<PermissionResponse>>> {
    return this.api.post("/permissions", {}, createData) as Promise<
      APIResult<IResponse<PermissionResponse>>
    >;
  }
  update(
    id: string | number,
    updateData: PermissionUpdating,
  ): Promise<APIResult<IResponse<PermissionResponse>>> {
    return this.api.put("/permissions/{permissionId}", id, updateData) as Promise<
      APIResult<IResponse<PermissionResponse>>
    >;
  }
  getOne(id: string | number): Promise<APIResult<IResponse<PermissionResponse>>> {
    return this.api.get("/permissions/{permissionId}", id) as Promise<APIResult<IResponse<PermissionResponse>>>;
  }
  getMany(filter: PermissionFilter): Promise<APIResult<IResponse<Pagination<PermissionResponse>>>> {
    return this.api.get("/permissions", filter) as Promise<
      APIResult<IResponse<Pagination<PermissionResponse>>>
    >;
  }
  delete(
    id: string | number,
  ): Promise<APIResult<IResponse<void>>> {
    return this.api.delete("/permissions/{permissionId}", id) as Promise<
      APIResult<IResponse<void>>
    >;
  }
}
