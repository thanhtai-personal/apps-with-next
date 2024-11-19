import { NEST_COMMON, NEST_CORE, ModuleRefInterceptor } from "@core-api/nest-core";
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { JobEntity } from "./entities";
import { JobsService } from "./services/jobs.service";
import { JobsController } from "./controllers";

const { Module } = NEST_COMMON;
const { APP_INTERCEPTOR } = NEST_CORE

@Module({
  imports: [
    TypeOrmModule.forFeature([JobEntity])
  ],
  providers: [
    JobsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [JobsController],
  exports: [JobsService],
})
  
export class JobsModule { }
