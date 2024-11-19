import { CategoryEntity } from '@/entities/category.entity';
import { InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { NEST_COMMON } from "@core-api/nest-core";
import { CategoriesService as CoreCategoriesService } from "@core-modules/categories";

const { Injectable } = NEST_COMMON;

@Injectable()
export class CategoriesService extends CoreCategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    protected categoriesRepository: Repository<CategoryEntity>,
  ) {
    super(categoriesRepository)
  }
}