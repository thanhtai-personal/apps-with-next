import { ChaptersController } from '@/controllers/chapter/chapters.controller';
import { ChapterEntity } from '@/entities/chapter.entity';
import { ChaptersService } from '@/services/chapters/chapters.service';
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { ModuleRefInterceptor, NEST_COMMON, NEST_CORE } from "@core-api/nest-core";

@NEST_COMMON.Module({
  imports: [
    TypeOrmModule.forFeature([ChapterEntity])
  ],
  providers: [
    ChaptersService,
    {
      provide: NEST_CORE.APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [ChaptersController],
  exports: [ChaptersService],
})
export class ChaptersModule { }
