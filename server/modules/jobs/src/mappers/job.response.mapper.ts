
import { JobEntity } from "../entities";
import { IJobResponse } from "../interfaces";

export class JobEntityToJobResponse {
  public static map(source: JobEntity, options?: any): IJobResponse {
    const rsSource = source as JobEntity;
    return rsSource as JobEntity
  }

  public static maps(sources: JobEntity[], options?: any): IJobResponse[] {
    return sources.map((item) => JobEntityToJobResponse.map(item));
  }
}