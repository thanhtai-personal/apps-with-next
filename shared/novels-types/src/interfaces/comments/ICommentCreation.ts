import { IComment } from "./IComment";

export interface ICommentCreation extends Omit<
  IComment,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
> { }
  