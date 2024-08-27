// famous people enrity
import { Column, Entity, OneToMany } from '@core-api/nest-typeorm-postgres';
import { BaseEntity } from './base.entity';
import { IFamousPerson } from '@core-ui/goat-tap-types';
import { UserEntity } from './user.entity';
// import { UserEntity } from './user.entity';

@Entity('famous_person')
export class FamousPersonEntity extends BaseEntity implements IFamousPerson {
  @Column({ type: "varchar", name: "name", nullable: false })
  name!: string;

  @Column({ type: "varchar", name: "image", nullable: true })
  image?: string | undefined;

  @Column({ type: "varchar", name: "link_twitter", nullable: true })
  linkTwitter?: string | undefined;

  @Column({ type: "varchar", name: "twitter_handler", nullable: true })
  twitterHandler?: string | undefined;

  @Column({ type: "varchar", name: "project", nullable: true })
  project?: string | undefined;

  @Column({ type: 'numeric', name: "group_points", default: 0 })
  groupPoints?: number;

  @Column({ type: "varchar", name: "note", nullable: true })
  note?: string | undefined;

  @OneToMany(() => UserEntity, (user) => user.famousPerson, { cascade: true })
  users?: UserEntity[];
}