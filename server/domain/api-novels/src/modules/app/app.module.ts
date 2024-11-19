import { AppController } from '@/controllers/app/app.controller';
import { AppService } from '@/services/app/app.service';
import { allModule } from '..';
import { DataSource } from '@core-api/nest-typeorm-postgres';
import { AppExceptionsFilter, NEST_COMMON, NEST_CORE, NEST_MICRO_SERVICE } from "@core-api/nest-core";
import { EnvironmentConfig } from "@/config";

@NEST_COMMON.Module({
  imports: [
    NEST_MICRO_SERVICE.ClientsModule.register([
      {
        name: 'NOVELS_SERVICE',
        transport: NEST_MICRO_SERVICE.Transport.REDIS,
        options: {
          host: EnvironmentConfig.REDIS_HOST,
          port: Number(EnvironmentConfig.REDIS_PORT),
        }
      },
    ]),
    ...(allModule || {})
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: NEST_CORE.APP_FILTER,
    useClass: AppExceptionsFilter,
  }],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
