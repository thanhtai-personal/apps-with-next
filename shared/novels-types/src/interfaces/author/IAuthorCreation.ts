import { IAuthor } from "./IAuthor";

export interface IAuthorCreation extends Omit<
  IAuthor,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
> { }
  