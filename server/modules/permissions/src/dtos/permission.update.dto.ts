import { IPermissionUpdating } from "../interfaces";

export class UpdatePermissionDto implements IPermissionUpdating {
  id?: number;
  name?: string;
  email?: string;
}