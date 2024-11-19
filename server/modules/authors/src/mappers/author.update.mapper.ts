import { AuthorEntity } from "../entities";
import { IAuthorUpdating } from "../interfaces";

export class AuthorUpdateDTOToEntityMapper {
  public static map(source: IAuthorUpdating, options?: any): AuthorEntity {
    const rsSource = source as AuthorEntity;
    return rsSource as AuthorEntity
  }
  public static maps(sources: IAuthorUpdating[], options?: any): AuthorEntity[] {
    return sources.map((item) => AuthorUpdateDTOToEntityMapper.map(item));
  }
}