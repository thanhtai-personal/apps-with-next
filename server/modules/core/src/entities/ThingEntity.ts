import {
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from '@core-api/nest-typeorm-postgres';
import { BaseEntity } from "./BaseEntity";
import { IThingEntity } from "./IThingEntity";

export class ThingEntity extends BaseEntity implements IThingEntity {
  @CreateDateColumn({ type: "timestamp", name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: "timestamp", name: 'deleted_at' })
  deletedAt?: Date;
}
