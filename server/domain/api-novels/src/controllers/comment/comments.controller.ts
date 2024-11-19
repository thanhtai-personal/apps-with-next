import { CommentsService } from '@/services/comments/comments.service';
import { CommentsController as CoreCommentsController } from "@core-modules/comments"
import { NEST_COMMON } from "@core-api/nest-core"

const { Controller } = NEST_COMMON

@Controller("/comments")
export class CommentsController extends CoreCommentsController {
  constructor(protected readonly commentService: CommentsService) {
    super(commentService);
  }
}
