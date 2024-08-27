import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IResponse, Pagination } from "@core-sdk/core";
import { TonRoutes } from "../types";

export class TonService
  extends BaseService<TonRoutes>
  implements IAbstractService<any, any, any, any> {
  constructor(api: FetchApi<TonRoutes>) {
    super(api);
  }

  checkIsTokenTransfered(packPrice: number): Promise<APIResult<IResponse<any>>> {
    return this.api.get("/ton/token-transfered", { packPrice }) as Promise<
      APIResult<IResponse<any>>
    >;
  }

  getMany(filter: any): Promise<APIResult<IResponse<Pagination<any>>>> {
    throw new Error("Not implemented");
  }

  getOne(id: string | number): Promise<APIResult<IResponse<any>>> {
    throw new Error("Not implemented");
  }

  create(createData: any): Promise<APIResult<IResponse<any>>> {
    throw new Error("Not implemented");
  }

  update(id: string | number, updateData: any): Promise<APIResult<IResponse<any>>> {
    throw new Error("Not implemented");
  }

  patchUpdate(id: string | number, updateData: any): Promise<APIResult<IResponse<any>>> {
    throw new Error("Not implemented");
  }

  delete(id: string | number): Promise<APIResult<IResponse<void>>> {
    throw new Error("Not implemented");
  }
}
