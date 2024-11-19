import { CommentEntity } from "../entities";
import { ICommentCreation } from "../interfaces";

export class CommentCreateDTOToEntityMapper {
  public static map(source: ICommentCreation, options?: any): CommentEntity {
    const rsSource = source as CommentEntity;
    return rsSource as CommentEntity
  }
  public static maps(sources: ICommentCreation[], options?: any): CommentEntity[] {
    return sources.map((item) => CommentCreateDTOToEntityMapper.map(item));
  }
}