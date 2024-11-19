import { ICategory } from "./ICategory";

export interface ICategoryUpdating extends Omit<ICategory
  , "createdAt" | "updatedAt" | "deletedAt"
> { }
