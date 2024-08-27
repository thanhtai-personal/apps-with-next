import { Column, Entity } from '@core-api/nest-typeorm-postgres';
import { BaseEntity } from '../base.entity';
import { IAccountState } from '@core-ui/goat-tap-types';

@Entity()
export class AccountState extends BaseEntity implements IAccountState {
  @Column()
  accountStatus?: string;

  @Column()
  balance?: string | number;

  @Column()
  codeHash?: string;

  @Column()
  dataHash?: string;

  @Column()
  frozenHash?: string;

  @Column()
  hash?: string;
}
