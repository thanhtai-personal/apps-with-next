import { IAuthor } from "./IAuthor";

export interface IAuthorUpdating extends Omit<IAuthor
  , "createdAt" | "updatedAt" | "deletedAt"
> { }
