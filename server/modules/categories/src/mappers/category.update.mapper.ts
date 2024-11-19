import { CategoryEntity } from "../entities";
import { ICategoryUpdating } from "../interfaces";

export class CategoryUpdateDTOToEntityMapper {
  public static map(source: ICategoryUpdating, options?: any): CategoryEntity {
    const rsSource = source as CategoryEntity;
    return rsSource as CategoryEntity
  }
  public static maps(sources: ICategoryUpdating[], options?: any): CategoryEntity[] {
    return sources.map((item) => CategoryUpdateDTOToEntityMapper.map(item));
  }
}