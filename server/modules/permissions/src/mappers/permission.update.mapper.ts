import { PermissionEntity } from "../entities";
import { IPermissionUpdating } from "../interfaces";

export class PermissionUpdateDTOToEntityMapper {
  public static map(source: IPermissionUpdating, options?: any): PermissionEntity {
    const rsSource = source as PermissionEntity;
    return rsSource as PermissionEntity
  }
  public static maps(sources: IPermissionUpdating[], options?: any): PermissionEntity[] {
    return sources.map((item) => PermissionUpdateDTOToEntityMapper.map(item));
  }
}