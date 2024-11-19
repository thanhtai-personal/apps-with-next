import { IRoleUpdating } from "../interfaces";

export class UpdateRoleDto implements IRoleUpdating {
  id?: number;
  name?: string;
  description?: string;
}