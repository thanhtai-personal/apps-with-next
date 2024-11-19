import { ChapterEntity } from "../entities";
import { IChapterCreation } from "../interfaces";

export class ChapterCreateDTOToEntityMapper {
  public static map(source: IChapterCreation, options?: any): ChapterEntity {
    const rsSource = source as ChapterEntity;
    return rsSource as ChapterEntity
  }
  public static maps(sources: IChapterCreation[], options?: any): ChapterEntity[] {
    return sources.map((item) => ChapterCreateDTOToEntityMapper.map(item));
  }
}