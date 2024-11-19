import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IAPIResponse } from "@core-sdk/core";
import {
  NovelsCommentRoutes,
} from "../types";
import { ICommentCreation, ICommentFilter, ICommentResponse, ICommentUpdating } from "@core-ui/novels-types";
import { INonPagingResponse, IPagingResponse, ISearchQuery } from "@core-ui/common-types";

export class CommentService
  extends BaseService<NovelsCommentRoutes>
  implements IAbstractService<ICommentCreation, ICommentUpdating, ICommentResponse, ISearchQuery<ICommentFilter>> {
  constructor(api: FetchApi<NovelsCommentRoutes>) {
    super(api);
  }
  create(createData: ICommentCreation): Promise<APIResult<IAPIResponse<ICommentResponse>>> {
    return this.api.post("/comments", {}, createData) as Promise<
      APIResult<IAPIResponse<ICommentResponse>>
    >;
  }
  update(
    id: string | number,
    updateData: ICommentUpdating,
  ): Promise<APIResult<IAPIResponse<ICommentResponse>>> {
    return this.api.put("/comments/{commentId}", { commentId: id }, updateData) as Promise<
      APIResult<IAPIResponse<ICommentResponse>>
    >;
  }

  patchUpdate(
    commentId: string | number,
    updateData: Partial<ICommentUpdating>
  ): Promise<APIResult<IAPIResponse<ICommentResponse>>> {
    return this.api.patch("/comments/{commentId}", { commentId }, updateData) as Promise<
      APIResult<IAPIResponse<ICommentResponse>>
    >;
  }

  getOne(id: string | number): Promise<APIResult<IAPIResponse<ICommentResponse>>> {
    return this.api.get("/comments/{commentId}", { commentId: id }) as Promise<APIResult<IAPIResponse<ICommentResponse>>>;
  }

  getMany(filter: ISearchQuery<ICommentFilter>): Promise<APIResult<IAPIResponse<IPagingResponse<ICommentResponse>>>> {
    return this.api.get("/comments", filter) as Promise<
      APIResult<IAPIResponse<IPagingResponse<ICommentResponse>>>
    >;
  }

  getAll(filter: ISearchQuery<ICommentFilter>): Promise<APIResult<IAPIResponse<INonPagingResponse<ICommentResponse>>>> {
    return this.api.get("/comments/all", filter) as Promise<
      APIResult<IAPIResponse<INonPagingResponse<ICommentResponse>>>
    >;
  }
  delete(
    id: string | number,
  ): Promise<APIResult<IAPIResponse<void>>> {
    return this.api.delete("/comments/{commentId}", { commentId: id }) as Promise<
      APIResult<IAPIResponse<void>>
    >;
  }
}
