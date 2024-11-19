import { JobEntity } from "../entities";
import { IJobCreation } from "../interfaces";

export class JobCreateDTOToEntityMapper {
  public static map(source: IJobCreation, options?: any): JobEntity {
    const rsSource = source as JobEntity;
    return rsSource as JobEntity
  }
  public static maps(sources: IJobCreation[], options?: any): JobEntity[] {
    return sources.map((item) => JobCreateDTOToEntityMapper.map(item));
  }
}