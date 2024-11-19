import { NEST_COMMON, NEST_CORE, ModuleRefInterceptor } from "@core-api/nest-core";
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { NovelEntity } from "./entities";
import { NovelsService } from "./services/novels.service";
import { NovelsController } from "./controllers";

const { Module } = NEST_COMMON;
const { APP_INTERCEPTOR } = NEST_CORE

@Module({
  imports: [
    TypeOrmModule.forFeature([NovelEntity])
  ],
  providers: [
    NovelsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [NovelsController],
  exports: [NovelsService],
})
  
export class NovelsModule { }
