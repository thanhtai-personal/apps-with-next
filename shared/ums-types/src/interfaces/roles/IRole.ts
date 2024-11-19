import { IPermissionResponse } from "../permissions";

export interface IRole {
  id?: number;
  name?: string;
  type?: string;
  description?: string;
  permissions?: IPermissionResponse[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
  