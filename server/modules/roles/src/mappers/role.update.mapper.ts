import { RoleEntity } from "../entities";
import { IRoleUpdating } from "../interfaces";

export class RoleUpdateDTOToEntityMapper {
  public static map(source: IRoleUpdating, options?: any): RoleEntity {
    const rsSource = source as RoleEntity;
    return rsSource as RoleEntity
  }
  public static maps(sources: IRoleUpdating[], options?: any): RoleEntity[] {
    return sources.map((item) => RoleUpdateDTOToEntityMapper.map(item));
  }
}