import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IAPIResponse } from "@core-sdk/core";
import {
  CrawlerRoutes,
} from "../types";

export class CrawlerService
  extends BaseService<CrawlerRoutes>
  implements IAbstractService<any, any, any, any> {
  constructor(api: FetchApi<CrawlerRoutes>) {
    super(api);
  }

  create = (createData: any) => {
    throw new Error("function not implemented");
  }

  update = (
    id: string | number,
    updateData: any,
  ) => {
    throw new Error("function not implemented");
  }

  patchUpdate = (
    id: string | number,
    updateData: any,
  ) => {
    throw new Error("function not implemented");
  }

  getOne = (id: string | number) => {
    throw new Error("function not implemented");
  }

  getMany = (filter: any) => {
    throw new Error("function not implemented");
  }
  delete = (
    id: string | number,
  ) => {
    throw new Error("function not implemented");
  }

  addAnydayJobData(jobId: string, categoryId: number, htmlString: string): Promise<APIResult<IAPIResponse<any>>> {
    return this.api.post("/crawler/anidays", {}, {
      jobId,
      categoryId,
      htmlString
    }) as Promise<
      APIResult<IAPIResponse<any>>
    >;
  }

  addNovelsFromTTV(jobId: string, categoryId: number, htmlString: string): Promise<APIResult<IAPIResponse<any>>> {
    return this.api.post("/crawler/tangthuvien", {
      jobId,
      categoryId,
      htmlString
    }) as Promise<
      APIResult<IAPIResponse<any>>
    >;
  }
}
