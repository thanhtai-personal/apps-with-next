import { CommentEntity } from '@/entities/comment.entity';
import { InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { NEST_COMMON } from "@core-api/nest-core";
import { CommentsService as CoreCommentsService } from "@core-modules/comments";

const { Injectable } = NEST_COMMON;

@Injectable()
export class CommentsService extends CoreCommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    protected commentsRepository: Repository<CommentEntity>,
  ) {
    super(commentsRepository)
  }
}