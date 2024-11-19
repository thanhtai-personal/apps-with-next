import { Column, Entity } from "@core-api/nest-typeorm-postgres";
import { IChapter } from "../interfaces";
import { ThingEntity } from "@core-modules/core"

@Entity('chapters')
export class ChapterEntity extends ThingEntity implements IChapter {
  
  @Column({ name: "name", type: 'varchar', nullable: true })
  name?: string;

  @Column({ name: "short_description", type: 'varchar', nullable: true })
  shortDescription?: string;

  @Column({ name: "full_description", type: 'varchar', nullable: true })
  fullDescription?: string;

  @Column({ name: "short_content", type: 'varchar', nullable: true })
  shortContent?: string;

  @Column({ name: "content", type: 'varchar', nullable: true })
  content?: string;

  @Column({ name: "html_content", type: 'varchar', nullable: true })
  htmlContent?: string;

  @Column({ name: "referrence", type: 'varchar', nullable: true })
  referrence?: string;

  @Column({ name: "thumb", type: 'varchar', nullable: true })
  thumb?: string;

  @Column({ name: "view", type: 'numeric', nullable: true, default: 0 })
  view?: number;

  @Column({ name: "chapter_index", type: 'numeric', nullable: true, default: 0 })
  chapterIndex?: number;
}