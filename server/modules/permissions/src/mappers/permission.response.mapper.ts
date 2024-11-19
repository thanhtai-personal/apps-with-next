
import { PermissionEntity } from "../entities";
import { IPermissionResponse } from "../interfaces";

export class PermissionEntityToPermissionResponse {
  public static map(source: PermissionEntity, options?: any): IPermissionResponse {
    const rsSource = source as PermissionEntity;
    return rsSource as PermissionEntity
  }

  public static maps(sources: PermissionEntity[], options?: any): IPermissionResponse[] {
    return sources.map((item) => PermissionEntityToPermissionResponse.map(item));
  }
}