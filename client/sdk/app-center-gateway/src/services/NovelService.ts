import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IAPIResponse } from "@core-sdk/core";
import {
  NovelRoutes,
} from "../types";
import { INovelCreation, INovelFilter, INovelResponse, INovelUpdating } from "@core-ui/novels-types";
import { INonPagingResponse, IPagingResponse, ISearchQuery } from "@core-ui/common-types";

export class NovelService
  extends BaseService<NovelRoutes>
  implements IAbstractService<INovelCreation, INovelUpdating, INovelResponse, ISearchQuery<INovelFilter>> {
  constructor(api: FetchApi<NovelRoutes>) {
    super(api);
  }
  create(createData: INovelCreation): Promise<APIResult<IAPIResponse<INovelResponse>>> {
    return this.api.post("/novels", {}, createData) as Promise<
      APIResult<IAPIResponse<INovelResponse>>
    >;
  }
  update(
    id: string | number,
    updateData: INovelUpdating,
  ): Promise<APIResult<IAPIResponse<INovelResponse>>> {
    return this.api.put("/novels/{novelId}", { novelId: id }, updateData) as Promise<
      APIResult<IAPIResponse<INovelResponse>>
    >;
  }

  patchUpdate(
    novelId: string | number,
    updateData: Partial<INovelUpdating>
  ): Promise<APIResult<IAPIResponse<INovelResponse>>> {
    return this.api.patch("/novels/{novelId}", { novelId }, updateData) as Promise<
      APIResult<IAPIResponse<INovelResponse>>
    >;
  }

  getOne(id: string | number): Promise<APIResult<IAPIResponse<INovelResponse>>> {
    return this.api.get("/novels/{novelId}", { novelId: id }) as Promise<APIResult<IAPIResponse<INovelResponse>>>;
  }

  getMany(filter: ISearchQuery<INovelFilter>): Promise<APIResult<IAPIResponse<IPagingResponse<INovelResponse>>>> {
    return this.api.get("/novels", filter) as Promise<
      APIResult<IAPIResponse<IPagingResponse<INovelResponse>>>
    >;
  }

  getAll(filter: ISearchQuery<INovelFilter>): Promise<APIResult<IAPIResponse<INonPagingResponse<INovelResponse>>>> {
    return this.api.get("/novels/all", filter || {}) as Promise<
      APIResult<IAPIResponse<INonPagingResponse<INovelResponse>>>
    >;
  }
  delete(
    id: string | number,
  ): Promise<APIResult<IAPIResponse<void>>> {
    return this.api.delete("/novels/{novelId}", { novelId: id }) as Promise<
      APIResult<IAPIResponse<void>>
    >;
  }
}
