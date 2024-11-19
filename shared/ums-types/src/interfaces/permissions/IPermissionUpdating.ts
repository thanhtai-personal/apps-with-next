import { IPermission } from "./IPermission";

export interface IPermissionUpdating extends Omit<IPermission
  , "createdAt" | "updatedAt" | "deletedAt"
> { }
