import { IPermissionCreation } from "../interfaces";

export class CreatePermissionDto implements IPermissionCreation {
  name?: string;
  email?: string;
}