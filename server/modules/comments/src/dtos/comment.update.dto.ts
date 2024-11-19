import { ICommentUpdating } from "../interfaces";

export class UpdateCommentDto implements ICommentUpdating {
  id?: number;
  username?: string;
  email?: string;
  content?: string;
  htmlContent?: string;
  avatar?: string;
}