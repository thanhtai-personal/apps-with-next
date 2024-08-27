import { Column, Entity, Index, JoinColumn, ManyToOne } from '@core-api/nest-typeorm-postgres';
import { BaseEntity } from './base.entity';
import { IBoost, BoostType } from '@core-ui/goat-tap-types';
import { UserEntity } from './user.entity';

@Entity("charge_info")
export class BoostEntity extends BaseEntity implements IBoost {
  @Column({ default: BoostType.Normal, type: 'varchar', name: 'type' })
  type!: BoostType;

  @Column({ default: 1, type: 'integer', name: 'level' })
  level!: number;

  @Column({ default: 1, type: 'numeric', name: 'tap_points_per_level' })
  pointsPerTap!: number;

  @Column({ default: 1, type: 'numeric', name: 'next_level_tap_points_per_level' })
  nextLevelPointsPerTap?: number;

  @Column({ default: 0, type: 'numeric', name: 'goat_price' })
  goatPrice!: number;

  @Column({ default: 0, type: 'numeric', name: 'ton_price' })
  tonPrice?: number;

  @Column({ type: 'timestamp', name: 'expired_at' })
  expiredAt?: Date;

  @ManyToOne(() => UserEntity, (user) => user.boosts, { cascade: false })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
