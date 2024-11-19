import { IChapter } from "./IChapter";

export interface IChapterUpdating extends Omit<IChapter
  , "createdAt" | "updatedAt" | "deletedAt"
> { }
