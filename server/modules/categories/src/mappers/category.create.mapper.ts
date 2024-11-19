import { CategoryEntity } from "../entities";
import { ICategoryCreation } from "../interfaces";

export class CategoryCreateDTOToEntityMapper {
  public static map(source: ICategoryCreation, options?: any): CategoryEntity {
    const rsSource = source as CategoryEntity;
    return rsSource as CategoryEntity
  }
  public static maps(sources: ICategoryCreation[], options?: any): CategoryEntity[] {
    return sources.map((item) => CategoryCreateDTOToEntityMapper.map(item));
  }
}