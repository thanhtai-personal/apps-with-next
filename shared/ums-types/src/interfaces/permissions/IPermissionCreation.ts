import { IPermission } from "./IPermission";

export interface IPermissionCreation extends Omit<
  IPermission,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
> { }
  