import { Column, Entity, ManyToOne } from "@core-api/nest-typeorm-postgres";
import { CommentEntity as CoreCommentEntity } from "@core-modules/comments"
import { NovelEntity } from "./novel.entity";
import { ChapterEntity } from "./chapter.entity";

@Entity('comments')
export class CommentEntity extends CoreCommentEntity {
  
  @Column({ name: "user_id", type: 'numeric', nullable: true })
  userId?: number;

  @ManyToOne(() => NovelEntity, (novel) => novel.comments, { cascade: true })
  novelData?: NovelEntity;

  @ManyToOne(() => ChapterEntity, (chapter) => chapter.comments, { cascade: true })
  chapterData?: ChapterEntity;
}