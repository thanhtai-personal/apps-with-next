import { Column, Entity } from '@core-api/nest-typeorm-postgres';
import { BaseEntity } from '../base.entity';
import { ITonWalletInfo } from '@core-ui/goat-tap-types';

@Entity()
export class TonWalletInfo extends BaseEntity implements ITonWalletInfo {
  @Column()
  address!: string;

  @Column()
  publicKey?: string;
}
