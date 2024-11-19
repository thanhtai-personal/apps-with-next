import { RoleEntity } from "../entities";
import { IRoleCreation } from "../interfaces";

export class RoleCreateDTOToEntityMapper {
  public static map(source: IRoleCreation, options?: any): RoleEntity {
    const rsSource = source as RoleEntity;
    return rsSource as RoleEntity
  }
  public static maps(sources: IRoleCreation[], options?: any): RoleEntity[] {
    return sources.map((item) => RoleCreateDTOToEntityMapper.map(item));
  }
}