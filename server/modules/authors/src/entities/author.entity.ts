import { Column, Entity } from "@core-api/nest-typeorm-postgres";
import { IAuthor } from "../interfaces";
import { ThingEntity } from "@core-modules/core"

@Entity('authors')
export class AuthorEntity extends ThingEntity implements IAuthor {
  @Column({ name: "name", type: 'varchar', nullable: true })
  name?: string;

  @Column({ name: "description", type: 'varchar', nullable: true })
  description?: string;

  @Column({ name: "html_description", type: 'varchar', nullable: true })
  htmlDescription?: string;

  @Column({ name: "points", type: 'numeric', nullable: true })
  points?: number;

  @Column({ name: "level", type: 'integer', nullable: true })
  level?: number;

  @Column({ name: "nick_name", type: 'varchar', nullable: true })
  nickName?: string;

  @Column({ name: "real_name", type: 'varchar', nullable: true })
  realName?: string;

  @Column({ name: "birthday", type: 'varchar', nullable: true })
  birthday?: string;

  @Column({ name: "gender", type: 'varchar', nullable: true })
  gender?: string;

  @Column({ name: "avatar", type: 'varchar', nullable: true })
  avatar?: string;
}