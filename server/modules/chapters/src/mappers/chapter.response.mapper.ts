
import { ChapterEntity } from "../entities";
import { IChapterResponse } from "../interfaces";

export class ChapterEntityToChapterResponse {
  public static map(source: ChapterEntity, options?: any): IChapterResponse {
    const rsSource = source as ChapterEntity;
    return rsSource as ChapterEntity
  }

  public static maps(sources: ChapterEntity[], options?: any): IChapterResponse[] {
    return sources.map((item) => ChapterEntityToChapterResponse.map(item));
  }
}