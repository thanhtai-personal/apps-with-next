import { IRole } from "./IRole";

export interface IRoleCreation extends Omit<
  IRole,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
> { }
  