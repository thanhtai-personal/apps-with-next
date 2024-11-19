import { Column, Entity } from "@core-api/nest-typeorm-postgres";
import { IUser } from "../interfaces";
import { ThingEntity } from "@core-modules/core"

@Entity('users')
export class UserEntity extends ThingEntity implements IUser {
  @Column({ name: "username", type: 'varchar', nullable: true })
  username?: string;

  @Column({ name: "email", type: 'varchar', nullable: true })
  email?: string;

  @Column({ name: "password", type: 'varchar', nullable: true })
  password?: string;

  @Column({ name: "salt", type: 'varchar', nullable: true })
  salt?: string;

  @Column({ name: "first_name", type: 'varchar', nullable: true })
  firstName?: string;

  @Column({ name: "last_name", type: 'varchar', nullable: true })
  lastName?: string;

  @Column({ name: "full_name", type: 'varchar', nullable: true })
  fullName?: string;

  @Column({ name: "avatar", type: 'varchar', nullable: true })
  avatar?: string;
}