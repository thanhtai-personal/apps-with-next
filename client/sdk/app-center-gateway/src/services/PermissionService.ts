import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IAPIResponse } from "@core-sdk/core";
import {
  PermissionRoutes,
} from "../types";
import { IPermissionCreation, IPermissionFilter, IPermissionResponse, IPermissionUpdating } from "@core-ui/ums-types";
import { INonPagingResponse, IPagingResponse, ISearchQuery } from "@core-ui/common-types";

export class PermissionService
  extends BaseService<PermissionRoutes>
  implements IAbstractService<IPermissionCreation, IPermissionUpdating, IPermissionResponse, ISearchQuery<IPermissionFilter>> {
  constructor(api: FetchApi<PermissionRoutes>) {
    super(api);
  }
  create(createData: IPermissionCreation): Promise<APIResult<IAPIResponse<IPermissionResponse>>> {
    return this.api.post("/permissions", {}, createData) as Promise<
      APIResult<IAPIResponse<IPermissionResponse>>
    >;
  }
  update(
    id: string | number,
    updateData: IPermissionUpdating,
  ): Promise<APIResult<IAPIResponse<IPermissionResponse>>> {
    return this.api.put("/permissions/{permissionId}", { permissionId: id }, updateData) as Promise<
      APIResult<IAPIResponse<IPermissionResponse>>
    >;
  }

  patchUpdate(
    permissionId: string | number,
    updateData: Partial<IPermissionUpdating>
  ): Promise<APIResult<IAPIResponse<IPermissionResponse>>> {
    return this.api.patch("/permissions/{permissionId}", { permissionId }, updateData) as Promise<
      APIResult<IAPIResponse<IPermissionResponse>>
    >;
  }

  getOne(id: string | number): Promise<APIResult<IAPIResponse<IPermissionResponse>>> {
    return this.api.get("/permissions/{permissionId}", { permissionId: id }) as Promise<APIResult<IAPIResponse<IPermissionResponse>>>;
  }

  getMany(filter: ISearchQuery<IPermissionFilter>): Promise<APIResult<IAPIResponse<IPagingResponse<IPermissionResponse>>>> {
    return this.api.get("/permissions", filter) as Promise<
      APIResult<IAPIResponse<IPagingResponse<IPermissionResponse>>>
    >;
  }

  getAll(filter: ISearchQuery<IPermissionFilter>): Promise<APIResult<IAPIResponse<INonPagingResponse<IPermissionResponse>>>> {
    return this.api.get("/permissions/all", filter || {}) as Promise<
      APIResult<IAPIResponse<INonPagingResponse<IPermissionResponse>>>
    >;
  }
  delete(
    id: string | number,
  ): Promise<APIResult<IAPIResponse<void>>> {
    return this.api.delete("/permissions/{permissionId}", { permissionId: id }) as Promise<
      APIResult<IAPIResponse<void>>
    >;
  }
}
