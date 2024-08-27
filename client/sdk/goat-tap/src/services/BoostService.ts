import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IPagingFilter, IResponse, Pagination } from "@core-sdk/core";
import {
  BoostRoutes,
} from "../types";
import { BoostType, IBoostCreation, IBoostResponse, IBoostUpdate } from "@core-ui/goat-tap-types";

export class BoostService
  extends BaseService<BoostRoutes>
  implements IAbstractService<IBoostCreation, any, IBoostResponse, IPagingFilter & any> {
  constructor(api: FetchApi<BoostRoutes>) {
    super(api);
  }
  create(createData: IBoostCreation): Promise<APIResult<IResponse<IBoostResponse>>> {
    return this.api.post("/boosts", {}, createData) as Promise<
      APIResult<IResponse<IBoostResponse>>
    >;
  }

  patchUpdate(
    boostId: string | number,
    updateData: Partial<IBoostUpdate>
  ): Promise<APIResult<IResponse<IBoostResponse>>> {
    return this.api.patch("/boosts/{boostId}", { boostId }, updateData) as Promise<
      APIResult<IResponse<IBoostResponse>>
    >;
  }

  buyBooster(
    boostType: BoostType
  ): Promise<APIResult<IResponse<IBoostResponse>>> {
    return this.api.post("/boosts/buy", { boostType }) as Promise<
      APIResult<IResponse<IBoostResponse>>
    >;
  }

  update(
    id: string | number,
    updateData: IBoostUpdate,
  ): Promise<APIResult<IResponse<IBoostResponse>>> {
    throw new Error("Not implemented");
  }

  getOne(id: string | number): Promise<APIResult<IResponse<IBoostResponse>>> {
    throw new Error("Not implemented");
  }

  getMany(filter: IPagingFilter & any): Promise<APIResult<IResponse<Pagination<IBoostResponse>>>> {
    throw new Error("Not implemented");
  }

  delete(
    id: string | number,
  ): Promise<APIResult<IResponse<void>>> {
    throw new Error("Not implemented");
  }
}
