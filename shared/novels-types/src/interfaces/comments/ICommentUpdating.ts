import { IComment } from "./IComment";

export interface ICommentUpdating extends Omit<IComment
  , "createdAt" | "updatedAt" | "deletedAt"
> { }
