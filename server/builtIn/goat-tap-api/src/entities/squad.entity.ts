import { Column, Entity, OneToMany } from '@core-api/nest-typeorm-postgres';
import { BaseEntity } from './base.entity';
import { ISquad } from '@core-ui/goat-tap-types';
import { UserEntity } from './user.entity';

@Entity('squad')
export class SquadEntity extends BaseEntity implements ISquad {
  @Column({ type: "varchar", nullable: false })
  name!: string;

  @Column({ type: "varchar", nullable: false })
  image!: string;

  @Column({ type: "varchar", nullable: true })
  description?: string | undefined;

  @OneToMany(() => UserEntity, (user) => user.squad, { cascade: true })
  users?: UserEntity[];
}
