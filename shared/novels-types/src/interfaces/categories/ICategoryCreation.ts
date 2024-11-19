import { ICategory } from "./ICategory";

export interface ICategoryCreation extends Omit<
  ICategory,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
> { }
  