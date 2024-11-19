
import { CategoryEntity } from "../entities";
import { ICategoryResponse } from "../interfaces";

export class CategoryEntityToCategoryResponse {
  public static map(source: CategoryEntity, options?: any): ICategoryResponse {
    const rsSource = source as CategoryEntity;
    return rsSource as CategoryEntity
  }

  public static maps(sources: CategoryEntity[], options?: any): ICategoryResponse[] {
    return sources.map((item) => CategoryEntityToCategoryResponse.map(item));
  }
}