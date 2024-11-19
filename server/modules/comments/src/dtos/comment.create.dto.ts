import { ICommentCreation } from "../interfaces";

export class CreateCommentDto implements ICommentCreation {
  username?: string;
  email?: string;
  content?: string;
  htmlContent?: string;
  avatar?: string;
}