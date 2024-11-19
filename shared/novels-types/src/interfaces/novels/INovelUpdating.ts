import { INovel } from "./INovel";

export interface INovelUpdating extends Omit<INovel
  , "createdAt" | "updatedAt" | "deletedAt"
> { }
