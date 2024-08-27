import {
  Column, Entity
} from '@core-api/nest-typeorm-postgres';

import { BaseEntity } from './base.entity';
import { IReferral } from '@core-ui/goat-tap-types';

@Entity('core_referrals')
export class ReferralEntity extends BaseEntity implements IReferral {
  @Column({ name: "code", length: 20 })
  code!: string;

  @Column({ name: "author", length: 50 })
  author!: string;

  @Column({ name: 'used_by', nullable: true })
  usedBy!: string;

  @Column({ name: 'used_at', nullable: true })
  usedAt!: Date;
}
