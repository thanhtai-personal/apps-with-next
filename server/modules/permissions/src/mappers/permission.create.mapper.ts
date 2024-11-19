import { PermissionEntity } from "../entities";
import { IPermissionCreation } from "../interfaces";

export class PermissionCreateDTOToEntityMapper {
  public static map(source: IPermissionCreation, options?: any): PermissionEntity {
    const rsSource = source as PermissionEntity;
    return rsSource as PermissionEntity
  }
  public static maps(sources: IPermissionCreation[], options?: any): PermissionEntity[] {
    return sources.map((item) => PermissionCreateDTOToEntityMapper.map(item));
  }
}