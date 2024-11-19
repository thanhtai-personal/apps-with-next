import { IUser } from "./IUser";

export interface IUserCreation extends Omit<
  IUser,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
> { }
  