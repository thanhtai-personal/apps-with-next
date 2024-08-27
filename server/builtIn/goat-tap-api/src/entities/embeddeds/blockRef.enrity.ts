import { Column, Entity } from '@core-api/nest-typeorm-postgres';
import { BaseEntity } from '../base.entity';
import { IBlockRef } from '@core-ui/goat-tap-types';

@Entity()
export class BlockRef extends BaseEntity implements IBlockRef {
  @Column()
  seqno?: number;

  @Column()
  shard?: string;

  @Column()
  workchain?: string;
}
