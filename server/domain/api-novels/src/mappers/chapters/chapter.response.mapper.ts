import { ChapterEntity } from "@/entities"
import { IChapterResponse } from "@core-ui/novels-types"

export class ChapterEntityToChapterResponse {
  public static map(source: ChapterEntity, options?: any): IChapterResponse {
    return source
  }

  public static maps(sources: ChapterEntity[], options?: any): IChapterResponse[] {
    return sources.map((item) => ChapterEntityToChapterResponse.map(item))
  }
}