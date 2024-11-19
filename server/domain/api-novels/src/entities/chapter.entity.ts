import { Entity, ManyToOne, OneToMany } from "@core-api/nest-typeorm-postgres";
import { ChapterEntity as CoreChapterEntity } from "@core-modules/chapters"
import { NovelEntity } from "./novel.entity";
import { CommentEntity } from "./comment.entity";

@Entity('chapters')
export class ChapterEntity extends CoreChapterEntity {
  @ManyToOne(() => NovelEntity, (novel) => novel.chaptersData, { cascade: false })
  novelData?: NovelEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.chapterData, { cascade: false })
  comments?: CommentEntity;
}