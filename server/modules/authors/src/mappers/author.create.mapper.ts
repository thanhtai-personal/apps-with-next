import { AuthorEntity } from "../entities";
import { IAuthorCreation } from "../interfaces";

export class AuthorCreateDTOToEntityMapper {
  public static map(source: IAuthorCreation, options?: any): AuthorEntity {
    const rsSource = source as AuthorEntity;
    return rsSource as AuthorEntity
  }
  public static maps(sources: IAuthorCreation[], options?: any): AuthorEntity[] {
    return sources.map((item) => AuthorCreateDTOToEntityMapper.map(item));
  }
}