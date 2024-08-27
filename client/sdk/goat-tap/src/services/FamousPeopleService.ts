import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IPagingFilter, IResponse, Pagination } from "@core-sdk/core";
import { FamousPeopleRoutes } from "../types";
import { IFamousPeopleUpdate, IFamousPeopleResponse } from "@core-ui/goat-tap-types";

export class FamousPeopleService
  extends BaseService<FamousPeopleRoutes>
  implements IAbstractService<any, any, IFamousPeopleResponse, IPagingFilter> {
  constructor(api: FetchApi<FamousPeopleRoutes>) {
    super(api);
  }

  getMany(filter: IPagingFilter): Promise<APIResult<IResponse<Pagination<IFamousPeopleResponse>>>> {
    return this.api.get("/famous-people", filter) as Promise<
      APIResult<IResponse<Pagination<IFamousPeopleResponse>>>
    >;
  }

  getOne(id: string | number): Promise<APIResult<IResponse<IFamousPeopleResponse>>> {
    throw new Error("Not implemented");
  }

  create(createData: any): Promise<APIResult<IResponse<IFamousPeopleResponse>>> {
    throw new Error("Not implemented");
  }

  update(id: string | number, updateData: any): Promise<APIResult<IResponse<IFamousPeopleResponse>>> {
    throw new Error("Not implemented");
  }

  patchUpdate(id: string | number, updateData: Partial<IFamousPeopleUpdate>): Promise<APIResult<IResponse<IFamousPeopleResponse>>> {
    return this.api.patch("/famous-people/{id}", { id }, updateData) as Promise<
      APIResult<IResponse<IFamousPeopleResponse>>
    >;
  }

  delete(id: string | number): Promise<APIResult<IResponse<void>>> {
    throw new Error("Not implemented");
  }
}
