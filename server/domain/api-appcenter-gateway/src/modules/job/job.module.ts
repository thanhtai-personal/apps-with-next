import { NEST_COMMON } from "@core-api/nest-core";
import { JobsController } from "@/controllers/jobs/jobs.controller";
import { NEST_MICRO_SERVICE } from "@core-api/nest-core";
import { EnvironmentConfig } from "@/config";
import { RECRUITER_SERVICE, UMS_SERVICE } from "@core-api/microservices-utils";
import { JobsService } from "@/services/jobs/jobs.service";

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
      {
        name: RECRUITER_SERVICE,
        transport: NEST_MICRO_SERVICE.Transport.REDIS,
        options: {
          host: EnvironmentConfig.REDIS_HOST,
          port: Number(EnvironmentConfig.REDIS_PORT),
        },
      },
    ]),
  ],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService]
})
export class JobModule {}
