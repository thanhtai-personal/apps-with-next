import { Entity, ManyToOne, OneToMany } from "@core-api/nest-typeorm-postgres";
import { NovelEntity as CoreNovelEntity } from "@core-modules/novels"
import { ChapterEntity } from "./chapter.entity";
import { AuthorEntity } from "./author.entity";
import { CategoryEntity } from "./category.entity";
import { CommentEntity } from "./comment.entity";

@Entity('novels')
export class NovelEntity extends CoreNovelEntity {
  
  @ManyToOne(() => AuthorEntity, (auth) => auth.novelsData, { cascade: true })
  authorData?: AuthorEntity;
  
  @ManyToOne(() => AuthorEntity, (auth) => auth.novelsData, { cascade: true })
  categoryData?: CategoryEntity;

  @OneToMany(() => ChapterEntity, (chapter) => chapter.novelData, { cascade: false })
  chaptersData?: ChapterEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.novelData, { cascade: false })
  comments?: CommentEntity[];
}