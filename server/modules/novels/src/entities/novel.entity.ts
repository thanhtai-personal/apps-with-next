import { Column, Entity } from "@core-api/nest-typeorm-postgres";
import { INovel } from "../interfaces";
import { ThingEntity } from "@core-modules/core"

@Entity('novels')
export class NovelEntity extends ThingEntity implements INovel {
  @Column({ name: "name", type: 'varchar', nullable: true })
  name?: string;

  @Column({ name: "short_description", type: 'varchar', nullable: true })
  shortDescription?: string;
  
  @Column({ name: "full_description", type: 'varchar', nullable: true })
  fullDescription?: string;
  
  @Column({ name: "referrence", type: 'varchar', nullable: true })
  referrence?: string;
  
  @Column({ name: "thumb", type: 'varchar', nullable: true })
  thumb?: string;
  
  @Column({ name: "star", type: 'numeric', nullable: true })
  star?: number;
  
  @Column({ name: "view", type: 'numeric', nullable: true })
  view?: number;
  
  @Column({ name: "like", type: 'numeric', nullable: true })
  like?: number;
  
  @Column({ name: "follow", type: 'numeric', nullable: true })
  follow?: number;
  
  @Column({ name: "suggest", type: 'numeric', nullable: true })
  suggest?: number;
  
  @Column({ name: "original_novel_id", type: 'varchar', nullable: true })
  originalNovelId?: string;
  
  @Column({ name: "is_full", type: 'boolean', nullable: true, default: false })
  isFull?: boolean;
  
  @Column({ name: "chaptersNumber", type: 'numeric', nullable: true, default: 0 })
  chaptersNumber?: number;
}