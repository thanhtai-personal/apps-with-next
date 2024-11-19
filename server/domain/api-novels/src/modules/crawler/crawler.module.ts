import { AuthorEntity, CategoryEntity, ChapterEntity, CommentEntity, NovelEntity } from '@/entities';
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { CrawlerController } from "@/controllers/crawler/crawler.controller";
import { TTVCrawlerService } from "@/services/ttvCrawler/ttvCrawler.service";
import { NEST_COMMON, NEST_SCHEDULE } from "@core-api/nest-core";

@NEST_COMMON.Module({
  imports: [
    TypeOrmModule.forFeature([
      NovelEntity, ChapterEntity, AuthorEntity, CommentEntity, CategoryEntity
    ]),
    NEST_SCHEDULE.ScheduleModule.forRoot(),
  ],
  providers: [TTVCrawlerService],
  controllers: [CrawlerController],
  exports: [TTVCrawlerService],
})
export class CrawlerModule { }
