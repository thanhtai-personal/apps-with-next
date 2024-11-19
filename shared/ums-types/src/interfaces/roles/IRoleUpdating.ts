import { IRole } from "./IRole";

export interface IRoleUpdating extends Omit<IRole
  , "createdAt" | "updatedAt" | "deletedAt"
> { }
