
import { RoleEntity } from "../entities";
import { IRoleResponse } from "../interfaces";

export class RoleEntityToRoleResponse {
  public static map(source: RoleEntity, options?: any): IRoleResponse {
    const rsSource = source as RoleEntity;
    return rsSource as RoleEntity
  }

  public static maps(sources: RoleEntity[], options?: any): IRoleResponse[] {
    return sources.map((item) => RoleEntityToRoleResponse.map(item));
  }
}