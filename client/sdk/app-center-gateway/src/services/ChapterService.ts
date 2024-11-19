import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IAPIResponse } from "@core-sdk/core";
import {
  ChapterRoutes,
} from "../types";
import { IChapterCreation, IChapterFilter, IChapterResponse, IChapterUpdating } from "@core-ui/novels-types";
import { INonPagingResponse, IPagingResponse, ISearchQuery } from "@core-ui/common-types";

export class ChapterService
  extends BaseService<ChapterRoutes>
  implements IAbstractService<IChapterCreation, IChapterUpdating, IChapterResponse, ISearchQuery<IChapterFilter>> {
  constructor(api: FetchApi<ChapterRoutes>) {
    super(api);
  }
  create(createData: IChapterCreation): Promise<APIResult<IAPIResponse<IChapterResponse>>> {
    return this.api.post("/chapters", {}, createData) as Promise<
      APIResult<IAPIResponse<IChapterResponse>>
    >;
  }
  update(
    id: string | number,
    updateData: IChapterUpdating,
  ): Promise<APIResult<IAPIResponse<IChapterResponse>>> {
    return this.api.put("/chapters/{chapterId}", { chapterId: id }, updateData) as Promise<
      APIResult<IAPIResponse<IChapterResponse>>
    >;
  }

  patchUpdate(
    chapterId: string | number,
    updateData: Partial<IChapterUpdating>
  ): Promise<APIResult<IAPIResponse<IChapterResponse>>> {
    return this.api.patch("/chapters/{chapterId}", { chapterId }, updateData) as Promise<
      APIResult<IAPIResponse<IChapterResponse>>
    >;
  }

  getOne(id: string | number): Promise<APIResult<IAPIResponse<IChapterResponse>>> {
    return this.api.get("/chapters/{chapterId}", { chapterId: id }) as Promise<APIResult<IAPIResponse<IChapterResponse>>>;
  }

  getMany(filter: ISearchQuery<IChapterFilter>): Promise<APIResult<IAPIResponse<IPagingResponse<IChapterResponse>>>> {
    return this.api.get("/chapters", filter) as Promise<
      APIResult<IAPIResponse<IPagingResponse<IChapterResponse>>>
    >;
  }

  getAll(filter: ISearchQuery<IChapterFilter>): Promise<APIResult<IAPIResponse<INonPagingResponse<IChapterResponse>>>> {
    return this.api.get("/chapters/all", filter) as Promise<
      APIResult<IAPIResponse<INonPagingResponse<IChapterResponse>>>
    >;
  }
  delete(
    id: string | number,
  ): Promise<APIResult<IAPIResponse<void>>> {
    return this.api.delete("/chapters/{chapterId}", { chapterId: id }) as Promise<
      APIResult<IAPIResponse<void>>
    >;
  }
}
