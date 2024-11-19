import { NovelEntity } from '@/entities/novel.entity';
import { NovelsService } from '@/services/novels/novels.service';
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { ModuleRefInterceptor, NEST_COMMON, NEST_CORE } from "@core-api/nest-core";
import { NovelsController } from "@/controllers/novel/novels.controller";

@NEST_COMMON.Module({
  imports: [
    TypeOrmModule.forFeature([NovelEntity])
  ],
  providers: [
    NovelsService,
    {
      provide: NEST_CORE.APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [NovelsController],
  exports: [NovelsService],
})
export class NovelsModule { }
