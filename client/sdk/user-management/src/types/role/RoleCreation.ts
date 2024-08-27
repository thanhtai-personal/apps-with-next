export interface RoleCreation {
  name: string;
  description?: string;
  permissions?: number[] | string[];
}
