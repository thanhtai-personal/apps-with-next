import { IUser } from "./IUser";

export interface IUserUpdating extends Omit<IUser
  , "createdAt" | "updatedAt" | "deletedAt"
> { }
