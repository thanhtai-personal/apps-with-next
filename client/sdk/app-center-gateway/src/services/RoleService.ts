import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IAPIResponse } from "@core-sdk/core";
import {
  RoleRoutes,
} from "../types";
import { IRoleCreation, IRoleFilter, IRoleResponse, IRoleUpdating } from "@core-ui/ums-types";
import { INonPagingResponse, IPagingResponse, ISearchQuery } from "@core-ui/common-types";

export class RoleService
  extends BaseService<RoleRoutes>
  implements IAbstractService<IRoleCreation, IRoleUpdating, IRoleResponse, ISearchQuery<IRoleFilter>> {
  constructor(api: FetchApi<RoleRoutes>) {
    super(api);
  }
  create(createData: IRoleCreation): Promise<APIResult<IAPIResponse<IRoleResponse>>> {
    return this.api.post("/roles", {}, createData) as Promise<
      APIResult<IAPIResponse<IRoleResponse>>
    >;
  }
  update(
    id: string | number,
    updateData: IRoleUpdating,
  ): Promise<APIResult<IAPIResponse<IRoleResponse>>> {
    return this.api.put("/roles/{roleId}", { roleId: id }, updateData) as Promise<
      APIResult<IAPIResponse<IRoleResponse>>
    >;
  }

  patchUpdate(
    roleId: string | number,
    updateData: Partial<IRoleUpdating>
  ): Promise<APIResult<IAPIResponse<IRoleResponse>>> {
    return this.api.patch("/roles/{roleId}", { roleId }, updateData) as Promise<
      APIResult<IAPIResponse<IRoleResponse>>
    >;
  }

  getOne(id: string | number): Promise<APIResult<IAPIResponse<IRoleResponse>>> {
    return this.api.get("/roles/{roleId}", { roleId: id }) as Promise<APIResult<IAPIResponse<IRoleResponse>>>;
  }

  getMany(filter: ISearchQuery<IRoleFilter>): Promise<APIResult<IAPIResponse<IPagingResponse<IRoleResponse>>>> {
    return this.api.get("/roles", filter) as Promise<
      APIResult<IAPIResponse<IPagingResponse<IRoleResponse>>>
    >;
  }

  getAll(filter: ISearchQuery<IRoleFilter>): Promise<APIResult<IAPIResponse<INonPagingResponse<IRoleResponse>>>> {
    return this.api.get("/roles/all", filter || {}) as Promise<
      APIResult<IAPIResponse<INonPagingResponse<IRoleResponse>>>
    >;
  }
  delete(
    id: string | number,
  ): Promise<APIResult<IAPIResponse<void>>> {
    return this.api.delete("/roles/{roleId}", { roleId: id }) as Promise<
      APIResult<IAPIResponse<void>>
    >;
  }
}
