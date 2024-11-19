import { CategoriesController } from '@/controllers/category/categories.controller';
import { CategoryEntity } from '@/entities/category.entity';
import { CategoriesService } from '@/services/categories/categories.service';
import { ModuleRefInterceptor, NEST_COMMON, NEST_CORE } from "@core-api/nest-core";
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';

@NEST_COMMON.Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity])
  ],
  providers: [
    CategoriesService,
    {
      provide: NEST_CORE.APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [CategoriesController],
  exports: [CategoriesService],
})
export class CategoriesModule { }
