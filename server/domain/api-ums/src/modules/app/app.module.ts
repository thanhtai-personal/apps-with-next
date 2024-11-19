import { AppController } from '@/controllers/app/app.controller';
import { AppService } from '@/services/app/app.service';
import { allModule } from '..';
import { DataSource } from '@core-api/nest-typeorm-postgres';
import { AppExceptionsFilter, NEST_COMMON, NEST_CORE, NEST_MICRO_SERVICE } from "@core-api/nest-core";
import { EnvironmentConfig } from "@/config";
import { UMS_SERVICE } from "@core-api/microservices-utils";

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
          retryAttempts: 3,
          retryDelay: 1000,
          wildcards: false,
        }
      },
    ]),
    ...(allModule || {})
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: AppExceptionsFilter,
  }],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
