import { CommentEntity } from "../entities";
import { ICommentUpdating } from "../interfaces";

export class CommentUpdateDTOToEntityMapper {
  public static map(source: ICommentUpdating, options?: any): CommentEntity {
    const rsSource = source as CommentEntity;
    return rsSource as CommentEntity
  }
  public static maps(sources: ICommentUpdating[], options?: any): CommentEntity[] {
    return sources.map((item) => CommentUpdateDTOToEntityMapper.map(item));
  }
}