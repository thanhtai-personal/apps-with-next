
import { AuthorEntity } from "../entities";
import { IAuthorResponse } from "../interfaces";

export class AuthorEntityToAuthorResponse {
  public static map(source: AuthorEntity, options?: any): IAuthorResponse {
    const rsSource = source as AuthorEntity;
    return rsSource as AuthorEntity
  }

  public static maps(sources: AuthorEntity[], options?: any): IAuthorResponse[] {
    return sources.map((item) => AuthorEntityToAuthorResponse.map(item));
  }
}