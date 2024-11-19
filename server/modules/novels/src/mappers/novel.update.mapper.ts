import { NovelEntity } from "../entities";
import { INovelUpdating } from "../interfaces";

export class NovelUpdateDTOToEntityMapper {
  public static map(source: INovelUpdating, options?: any): NovelEntity {
    const rsSource = source as NovelEntity;
    return rsSource as NovelEntity
  }
  public static maps(sources: INovelUpdating[], options?: any): NovelEntity[] {
    return sources.map((item) => NovelUpdateDTOToEntityMapper.map(item));
  }
}