import { Column, Entity } from '@core-api/nest-typeorm-postgres';
import { BaseEntity } from '../base.entity';
import { IDescription } from '@core-ui/goat-tap-types';

@Entity()
export class Description extends BaseEntity implements IDescription {
  @Column()
  aborted?: boolean;

  @Column()
  computePhSkipReason?: string;

  @Column()
  computePhSkipType?: string;

  @Column()
  creditFirst?: boolean;

  @Column()
  creditPhCredit?: string | number;

  @Column()
  destroyed?: boolean;

  @Column()
  storagePhStatusChange?: string;

  @Column()
  storagePhStorageFeesCollected?: string | number;

  @Column()
  type?: string;
}
