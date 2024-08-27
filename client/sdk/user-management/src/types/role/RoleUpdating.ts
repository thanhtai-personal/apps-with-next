export interface RoleUpdating {
  name: string;
  description?: string;
  permissions?: number[] | string[];
}
