
import { CommentEntity } from "../entities";
import { ICommentResponse } from "../interfaces";

export class CommentEntityToCommentResponse {
  public static map(source: CommentEntity, options?: any): ICommentResponse {
    const rsSource = source as CommentEntity;
    return rsSource as CommentEntity
  }

  public static maps(sources: CommentEntity[], options?: any): ICommentResponse[] {
    return sources.map((item) => CommentEntityToCommentResponse.map(item));
  }
}