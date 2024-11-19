import { CommentsController } from '@/controllers/comment/comments.controller';
import { CommentEntity } from '@/entities/comment.entity';
import { CommentsService } from '@/services/comments/comments.service';
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { ModuleRefInterceptor, NEST_COMMON, NEST_CORE } from "@core-api/nest-core";

@NEST_COMMON.Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity])
  ],
  providers: [
    CommentsService,
    {
      provide: NEST_CORE.APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule { }
