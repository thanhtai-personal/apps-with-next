import { NEST_COMMON, NEST_CORE, ModuleRefInterceptor } from "@core-api/nest-core";
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { CommentEntity } from "./entities";
import { CommentsService } from "./services/comments.service";
import { CommentsController } from "./controllers";

const { Module } = NEST_COMMON;
const { APP_INTERCEPTOR } = NEST_CORE

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity])
  ],
  providers: [
    CommentsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [CommentsController],
  exports: [CommentsService],
})
  
export class CommentsModule { }
