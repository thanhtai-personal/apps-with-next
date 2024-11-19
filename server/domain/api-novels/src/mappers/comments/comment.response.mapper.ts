import { CommentEntity } from "@/entities"
import { ICommentResponse } from "@core-ui/novels-types"

export class CommentEntityToCommentResponse {
  public static map(source: CommentEntity, options?: any): ICommentResponse {
    return source
  }

  public static maps(sources: CommentEntity[], options?: any): ICommentResponse[] {
    return sources.map((item) => CommentEntityToCommentResponse.map(item))
  }
}