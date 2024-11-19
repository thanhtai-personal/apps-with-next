import { ChapterEntity } from "@/entities"
import { IChapterCreation } from "@core-ui/novels-types"

export class ChapterCreateDTOToEntityMapper {
  public static map(source: IChapterCreation, options?: any): ChapterEntity {
    const rsSource = source as ChapterEntity;
    return rsSource as ChapterEntity
  }
}