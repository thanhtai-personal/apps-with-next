import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IAPIResponse } from "@core-sdk/core";
import {
  AuthorRoutes,
} from "../types";
import { IAuthorCreation, IAuthorFilter, IAuthorResponse, IAuthorUpdating } from "@core-ui/novels-types";
import { INonPagingResponse, IPagingResponse, ISearchQuery } from "@core-ui/common-types";

export class AuthorService
  extends BaseService<AuthorRoutes>
  implements IAbstractService<IAuthorCreation, IAuthorUpdating, IAuthorResponse, ISearchQuery<IAuthorFilter>> {
  constructor(api: FetchApi<AuthorRoutes>) {
    super(api);
  }
  create(createData: IAuthorCreation): Promise<APIResult<IAPIResponse<IAuthorResponse>>> {
    return this.api.post("/authors", {}, createData) as Promise<
      APIResult<IAPIResponse<IAuthorResponse>>
    >;
  }
  update(
    id: string | number,
    updateData: IAuthorUpdating,
  ): Promise<APIResult<IAPIResponse<IAuthorResponse>>> {
    return this.api.put("/authors/{authorId}", { authorId: id }, updateData) as Promise<
      APIResult<IAPIResponse<IAuthorResponse>>
    >;
  }

  patchUpdate(
    authorId: string | number,
    updateData: Partial<IAuthorUpdating>
  ): Promise<APIResult<IAPIResponse<IAuthorResponse>>> {
    return this.api.patch("/authors/{authorId}", { authorId }, updateData) as Promise<
      APIResult<IAPIResponse<IAuthorResponse>>
    >;
  }

  getOne(id: string | number): Promise<APIResult<IAPIResponse<IAuthorResponse>>> {
    return this.api.get("/authors/{authorId}", { authorId: id }) as Promise<APIResult<IAPIResponse<IAuthorResponse>>>;
  }

  getMany(filter: ISearchQuery<IAuthorFilter>): Promise<APIResult<IAPIResponse<IPagingResponse<IAuthorResponse>>>> {
    return this.api.get("/authors", filter) as Promise<
      APIResult<IAPIResponse<IPagingResponse<IAuthorResponse>>>
    >;
  }

  getAll(filter: ISearchQuery<IAuthorFilter>): Promise<APIResult<IAPIResponse<INonPagingResponse<IAuthorResponse>>>> {
    return this.api.get("/authors/all", filter || {}) as Promise<
      APIResult<IAPIResponse<INonPagingResponse<IAuthorResponse>>>
    >;
  }
  delete(
    id: string | number,
  ): Promise<APIResult<IAPIResponse<void>>> {
    return this.api.delete("/authors/{authorId}", { authorId: id }) as Promise<
      APIResult<IAPIResponse<void>>
    >;
  }
}
