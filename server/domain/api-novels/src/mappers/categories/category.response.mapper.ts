import { CategoryEntity } from "@/entities"
import { ICategoryResponse } from "@core-ui/novels-types"

export class CategoryEntityToCategoryResponse {
  public static map(source: CategoryEntity, options?: any): ICategoryResponse {
    return source
  }

  public static maps(sources: CategoryEntity[], options?: any): ICategoryResponse[] {
    return sources.map((item) => CategoryEntityToCategoryResponse.map(item))
  }
}