import { ICategoryCreation } from "@core-ui/novels-types"
import { UpdateCategoryDto as CoreUpdateCategoryDto } from "@core-modules/categories"

export class UpdateCategoryDto extends CoreUpdateCategoryDto implements ICategoryCreation {}