import { NEST_COMMON } from "@core-api/nest-core";
import { NovelCategoriesController } from "@/controllers/novelCategories/categories.novel.controller";
import { NEST_MICRO_SERVICE } from "@core-api/nest-core";
import { EnvironmentConfig } from "@/config";
import { UMS_SERVICE } from "@core-api/microservices-utils";
import { NovelCategoriesService } from "@/services/novelCategories/categories.novel.service";

const { Module } = NEST_COMMON;

@Module({
  imports: [
    NEST_MICRO_SERVICE.ClientsModule.register([
      {
        name: UMS_SERVICE,
        transport: NEST_MICRO_SERVICE.Transport.REDIS,
        options: {
          host: EnvironmentConfig.REDIS_HOST,
          port: Number(EnvironmentConfig.REDIS_PORT),
        },
      },
    ]),
  ],
  controllers: [NovelCategoriesController],
  providers: [NovelCategoriesService],
  exports: [NovelCategoriesService]
})
export class NovelCategoryModule {}
