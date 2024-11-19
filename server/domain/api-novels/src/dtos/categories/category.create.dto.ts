import { ICategoryCreation } from "@core-ui/novels-types"
import { CreateCategoryDto as CoreCreateCategoryDto } from "@core-modules/categories"

export class CreateCategoryDto extends CoreCreateCategoryDto implements ICategoryCreation {}