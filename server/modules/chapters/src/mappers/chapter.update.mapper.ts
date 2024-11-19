import { ChapterEntity } from "../entities";
import { IChapterUpdating } from "../interfaces";

export class ChapterUpdateDTOToEntityMapper {
  public static map(source: IChapterUpdating, options?: any): ChapterEntity {
    const rsSource = source as ChapterEntity;
    return rsSource as ChapterEntity
  }
  public static maps(sources: IChapterUpdating[], options?: any): ChapterEntity[] {
    return sources.map((item) => ChapterUpdateDTOToEntityMapper.map(item));
  }
}