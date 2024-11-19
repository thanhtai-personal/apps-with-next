import { JobsController } from '@/controllers/job/jobs.controller';
import { JobEntity } from '@/entities/job.entity';
import { JobsService } from '@/services/jobs/jobs.service';
import { ModuleRefInterceptor, NEST_COMMON, NEST_CORE } from "@core-api/nest-core";
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';

@NEST_COMMON.Module({
  imports: [
    TypeOrmModule.forFeature([JobEntity])
  ],
  providers: [
    JobsService,
    {
      provide: NEST_CORE.APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [JobsController],
  exports: [JobsService],
})
export class JobsModule { }
