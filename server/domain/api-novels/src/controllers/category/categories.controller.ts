import { CategoriesService } from '@/services/categories/categories.service';
import { CategoriesController as CoreCategoriesController } from "@core-modules/categories"
import { NEST_COMMON } from "@core-api/nest-core"

const { Controller } = NEST_COMMON

@Controller("/categories")
export class CategoriesController extends CoreCategoriesController {
  constructor(protected readonly categoryService: CategoriesService) {
    super(categoryService);
  }
}
