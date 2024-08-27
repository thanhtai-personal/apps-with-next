import { PermissionResponse } from "../permission/PermissionResponse";

export interface RoleResponse {
  id: number | string;
  name: string;
  description?: string;
  permissions?: PermissionResponse[];
}
