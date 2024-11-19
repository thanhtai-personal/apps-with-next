import {
  PrimaryGeneratedColumn,
  BaseEntity as TypeOrmBaseEntity,
} from '@core-api/nest-typeorm-postgres';
import { IBaseEntity } from "./IBaseEntity";

export class BaseEntity extends TypeOrmBaseEntity implements IBaseEntity  {
  @PrimaryGeneratedColumn({ type: "bigint", name: 'id' })
  id!: number;
}
