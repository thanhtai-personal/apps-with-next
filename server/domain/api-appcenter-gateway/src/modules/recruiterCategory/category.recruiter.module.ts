import { NEST_COMMON } from "@core-api/nest-core";
import { RecruiterCategoriesController } from "@/controllers/recruiterCategories/categories.recruiter.controller";
import { NEST_MICRO_SERVICE } from "@core-api/nest-core";
import { EnvironmentConfig } from "@/config";
import { UMS_SERVICE } from "@core-api/microservices-utils";
import { RecruiterCategoriesService } from "@/services/recruiterCategories/categories.recruiter.service";

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
  controllers: [RecruiterCategoriesController],
  providers: [RecruiterCategoriesService],
  exports: [RecruiterCategoriesService]
})
export class RecruiterCategoryModule {}
