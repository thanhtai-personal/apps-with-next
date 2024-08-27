import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity as TypeOrmBaseEntity,
  UpdateDateColumn,
} from '@core-api/nest-typeorm-postgres';

export class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: 'id' })
  id!: number;

  @CreateDateColumn({ type: "timestamp", name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: "timestamp", name: 'deleted_at' })
  deletedAt?: Date;
}
