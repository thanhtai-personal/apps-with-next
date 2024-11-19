import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IAPIResponse } from "@core-sdk/core";
import {
  NovelsCategoryRoutes,
} from "../types";
import { ICategoryCreation, ICategoryFilter, ICategoryResponse, ICategoryUpdating } from "@core-ui/novels-types";
import { INonPagingResponse, IPagingResponse, ISearchQuery } from "@core-ui/common-types";

export class NovelCategoryService
  extends BaseService<NovelsCategoryRoutes>
  implements IAbstractService<ICategoryCreation, ICategoryUpdating, ICategoryResponse, ISearchQuery<ICategoryFilter>> {
  constructor(api: FetchApi<NovelsCategoryRoutes>) {
    super(api);
  }
  create(createData: ICategoryCreation): Promise<APIResult<IAPIResponse<ICategoryResponse>>> {
    return this.api.post("/novels/categories", {}, createData) as Promise<
      APIResult<IAPIResponse<ICategoryResponse>>
    >;
  }
  update(
    id: string | number,
    updateData: ICategoryUpdating,
  ): Promise<APIResult<IAPIResponse<ICategoryResponse>>> {
    return this.api.put("/novels/categories/{categoryId}", { categoryId: id }, updateData) as Promise<
      APIResult<IAPIResponse<ICategoryResponse>>
    >;
  }

  patchUpdate(
    categoryId: string | number,
    updateData: Partial<ICategoryUpdating>
  ): Promise<APIResult<IAPIResponse<ICategoryResponse>>> {
    return this.api.patch("/novels/categories/{categoryId}", { categoryId }, updateData) as Promise<
      APIResult<IAPIResponse<ICategoryResponse>>
    >;
  }

  getOne(id: string | number): Promise<APIResult<IAPIResponse<ICategoryResponse>>> {
    return this.api.get("/novels/categories/{categoryId}", { categoryId: id }) as Promise<APIResult<IAPIResponse<ICategoryResponse>>>;
  }

  getMany(filter: ISearchQuery<ICategoryFilter>): Promise<APIResult<IAPIResponse<IPagingResponse<ICategoryResponse>>>> {
    return this.api.get("/novels/categories", filter) as Promise<
      APIResult<IAPIResponse<IPagingResponse<ICategoryResponse>>>
    >;
  }

  getAll(filter: ISearchQuery<ICategoryFilter>): Promise<APIResult<IAPIResponse<INonPagingResponse<ICategoryResponse>>>> {
    return this.api.get("/novels/categories/all", filter || {}) as Promise<
      APIResult<IAPIResponse<INonPagingResponse<ICategoryResponse>>>
    >;
  }
  delete(
    id: string | number,
  ): Promise<APIResult<IAPIResponse<void>>> {
    return this.api.delete("/novels/categories/{categoryId}", { categoryId: id }) as Promise<
      APIResult<IAPIResponse<void>>
    >;
  }
}
