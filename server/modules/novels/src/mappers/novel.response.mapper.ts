
import { NovelEntity } from "../entities";
import { INovelResponse } from "../interfaces";

export class NovelEntityToNovelResponse {
  public static map(source: NovelEntity, options?: any): INovelResponse {
    const rsSource = source as NovelEntity;
    return rsSource as NovelEntity
  }

  public static maps(sources: NovelEntity[], options?: any): INovelResponse[] {
    return sources.map((item) => NovelEntityToNovelResponse.map(item));
  }
}