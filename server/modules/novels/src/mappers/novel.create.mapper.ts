import { NovelEntity } from "../entities";
import { INovelCreation } from "../interfaces";

export class NovelCreateDTOToEntityMapper {
  public static map(source: INovelCreation, options?: any): NovelEntity {
    const rsSource = source as NovelEntity;
    return rsSource as NovelEntity
  }
  public static maps(sources: INovelCreation[], options?: any): NovelEntity[] {
    return sources.map((item) => NovelCreateDTOToEntityMapper.map(item));
  }
}