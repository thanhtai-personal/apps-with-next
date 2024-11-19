import { APIResult, BaseService, FetchApi } from "@core-ui/api-client";
import { IAbstractService, IAPIResponse } from "@core-sdk/core";
import {
  JobRoutes,
} from "../types";
import { IJobCreation, IJobFilter, IJobResponse, IJobUpdating } from "@core-ui/recruiter-types";
import { INonPagingResponse, IPagingResponse, ISearchQuery } from "@core-ui/common-types";

export class JobService
  extends BaseService<JobRoutes>
  implements IAbstractService<IJobCreation, IJobUpdating, IJobResponse, ISearchQuery<IJobFilter>> {
  constructor(api: FetchApi<JobRoutes>) {
    super(api);
  }
  create(createData: IJobCreation): Promise<APIResult<IAPIResponse<IJobResponse>>> {
    return this.api.post("/jobs", {}, createData) as Promise<
      APIResult<IAPIResponse<IJobResponse>>
    >;
  }
  update(
    id: string | number,
    updateData: IJobUpdating,
  ): Promise<APIResult<IAPIResponse<IJobResponse>>> {
    return this.api.put("/jobs/{jobId}", { jobId: id }, updateData) as Promise<
      APIResult<IAPIResponse<IJobResponse>>
    >;
  }

  patchUpdate(
    jobId: string | number,
    updateData: Partial<IJobUpdating>
  ): Promise<APIResult<IAPIResponse<IJobResponse>>> {
    return this.api.patch("/jobs/{jobId}", { jobId }, updateData) as Promise<
      APIResult<IAPIResponse<IJobResponse>>
    >;
  }

  getOne(id: string | number): Promise<APIResult<IAPIResponse<IJobResponse>>> {
    return this.api.get("/jobs/{jobId}", { jobId: id }) as Promise<APIResult<IAPIResponse<IJobResponse>>>;
  }

  getMany(filter: ISearchQuery<IJobFilter>): Promise<APIResult<IAPIResponse<IPagingResponse<IJobResponse>>>> {
    return this.api.get("/jobs", filter) as Promise<
      APIResult<IAPIResponse<IPagingResponse<IJobResponse>>>
    >;
  }

  getAll(filter: ISearchQuery<IJobFilter>): Promise<APIResult<IAPIResponse<INonPagingResponse<IJobResponse>>>> {
    return this.api.get("/jobs/all", filter) as Promise<
      APIResult<IAPIResponse<INonPagingResponse<IJobResponse>>>
    >;
  }
  delete(
    id: string | number,
  ): Promise<APIResult<IAPIResponse<void>>> {
    return this.api.delete("/jobs/{jobId}", { jobId: id }) as Promise<
      APIResult<IAPIResponse<void>>
    >;
  }
}
