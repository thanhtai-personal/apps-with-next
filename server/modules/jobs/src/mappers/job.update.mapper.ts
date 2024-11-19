import { JobEntity } from "../entities";
import { IJobUpdating } from "../interfaces";

export class JobUpdateDTOToEntityMapper {
  public static map(source: IJobUpdating, options?: any): JobEntity {
    const rsSource = source as JobEntity;
    return rsSource as JobEntity
  }
  public static maps(sources: IJobUpdating[], options?: any): JobEntity[] {
    return sources.map((item) => JobUpdateDTOToEntityMapper.map(item));
  }
}