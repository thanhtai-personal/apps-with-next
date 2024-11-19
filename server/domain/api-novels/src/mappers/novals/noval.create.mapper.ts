import { NovelEntity } from "@/entities"
import { INovelCreation } from "@core-ui/novels-types"

export class NovelCreateDTOToEntityMapper {
  public static map(source: INovelCreation, options?: any): NovelEntity {
    const rsSource = source as NovelEntity;
    return rsSource as NovelEntity
  }
}