import { CategoryEntity, JobEntity } from '@/entities';
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { CrawlerController } from "@/controllers/crawler/crawler.controller";
import { AnyDayCrawlerService } from "@/services/anyDayCrawler/anyDayCrawler.service";
import { ModuleRefInterceptor, NEST_COMMON, NEST_CORE, NEST_SCHEDULE } from "@core-api/nest-core";

@NEST_COMMON.Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryEntity, JobEntity
    ]),
    NEST_SCHEDULE.ScheduleModule.forRoot(),
  ],
  providers: [AnyDayCrawlerService,
    {
      provide: NEST_CORE.APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [CrawlerController],
  exports: [AnyDayCrawlerService],
})
export class CrawlerModule { }
