import { EnvironmentConfig } from "@/config";
import { allModule } from '..';
import { AppExceptionsFilter, NEST_COMMON, NEST_CORE, NEST_MICRO_SERVICE } from "@core-api/nest-core";
import { NOVEL_SERVICE, RECRUITER_SERVICE, UMS_SERVICE } from "@core-api/microservices-utils";

const { Module } = NEST_COMMON
const { APP_FILTER } = NEST_CORE

@Module({
  imports: [
    NEST_MICRO_SERVICE.ClientsModule.register([
      {
        name: UMS_SERVICE,
        transport: NEST_MICRO_SERVICE.Transport.REDIS,
        options: {
          host: EnvironmentConfig.REDIS_HOST,
          port: Number(EnvironmentConfig.REDIS_PORT),
        }
      },
      {
        name: RECRUITER_SERVICE,
        transport: NEST_MICRO_SERVICE.Transport.REDIS,
        options: {
          host: EnvironmentConfig.REDIS_HOST,
          port: Number(EnvironmentConfig.REDIS_PORT),
        }
      },
      {
        name: NOVEL_SERVICE,
        transport: NEST_MICRO_SERVICE.Transport.REDIS,
        options: {
          host: EnvironmentConfig.REDIS_HOST,
          port: Number(EnvironmentConfig.REDIS_PORT),
        }
      },
    ]),
    ...(allModule || {})
  ],
  providers: [{
    provide: APP_FILTER,
    useClass: AppExceptionsFilter,
  }],
})
export class AppModule {
  constructor() { }
}
