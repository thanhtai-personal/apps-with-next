import { Column, Entity } from "@core-api/nest-typeorm-postgres";
import { IComment } from "../interfaces";
import { ThingEntity } from "@core-modules/core"

@Entity('comments')
export class CommentEntity extends ThingEntity implements IComment {
  
  @Column({ name: "username", type: 'varchar', nullable: true })
  username?: string;

  @Column({ name: "email", type: 'varchar', nullable: true })
  email?: string;

  @Column({ name: "content", type: 'varchar', nullable: true })
  content?: string;

  @Column({ name: "html_content", type: 'varchar', nullable: true })
  htmlContent?: string;

  @Column({ name: "avatar", type: 'varchar', nullable: true })
  avatar?: string;
}