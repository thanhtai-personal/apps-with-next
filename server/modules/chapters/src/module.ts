import { NEST_COMMON, NEST_CORE, ModuleRefInterceptor } from "@core-api/nest-core";
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { ChapterEntity } from "./entities";
import { ChaptersService } from "./services/chapters.service";
import { ChaptersController } from "./controllers";

const { Module } = NEST_COMMON;
const { APP_INTERCEPTOR } = NEST_CORE

@Module({
  imports: [
    TypeOrmModule.forFeature([ChapterEntity])
  ],
  providers: [
    ChaptersService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [ChaptersController],
  exports: [ChaptersService],
})
  
export class ChaptersModule { }
