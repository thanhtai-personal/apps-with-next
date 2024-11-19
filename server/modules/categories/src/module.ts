import { NEST_COMMON, NEST_CORE, ModuleRefInterceptor } from "@core-api/nest-core";
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { CategoryEntity } from "./entities";
import { CategoriesService } from "./services/categories.service";
import { CategoriesController } from "./controllers";

const { Module } = NEST_COMMON;
const { APP_INTERCEPTOR } = NEST_CORE

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity])
  ],
  providers: [
    CategoriesService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [CategoriesController],
  exports: [CategoriesService],
})
  
export class CategoriesModule { }
