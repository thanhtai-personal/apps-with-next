
import { Column, Entity } from '@core-api/nest-typeorm-postgres';
import { BaseEntity } from './base.entity';
import { OnChainEvent } from '@core-ui/goat-tap-types';

@Entity('core_onchainevents')
export class OnChainEventEntity extends BaseEntity implements OnChainEvent {

  @Column()
  name!: string;

  @Column({ name: 'block_no' })
  blockNo!: number;

  @Column({ name: 'transaction_hash' })
  transactionHash!: string;

  @Column({ name: 'log_index' })
  logIndex!: number;

  @Column({ type: 'json' })
  data: unknown;

  @Column()
  contract!: string;

  @Column({ name: 'ref_name', nullable: true })
  refName!: string;

  @Column({ name: 'ref_id', nullable: true })
  refId!: string;
}
