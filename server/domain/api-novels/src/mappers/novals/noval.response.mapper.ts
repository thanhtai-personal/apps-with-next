import { NovelEntity } from "@/entities"
import { INovelResponse } from "@core-ui/novels-types"

export class NovelEntityToNovelResponse {
  public static map(source: NovelEntity, options?: any): INovelResponse {
    return source
  }

  public static maps(sources: NovelEntity[], options?: any): INovelResponse[] {
    return sources.map((item) => NovelEntityToNovelResponse.map(item))
  }
}