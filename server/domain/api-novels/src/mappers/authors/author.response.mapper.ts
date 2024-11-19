import { AuthorEntity } from "@/entities"
import { IAuthorResponse } from "@core-ui/novels-types"

export class AuthorEntityToAuthorResponse {
  public static map(source: AuthorEntity, options?: any): IAuthorResponse {
    return source
  }

  public static maps(sources: AuthorEntity[], options?: any): IAuthorResponse[] {
    return sources.map((item) => AuthorEntityToAuthorResponse.map(item))
  }
}