import { IRoleCreation } from "../interfaces";

export class CreateRoleDto implements IRoleCreation {
  name?: string;
  description?: string;
}