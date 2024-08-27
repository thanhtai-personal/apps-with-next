import { Column, Entity } from '@core-api/nest-typeorm-postgres';
import { BaseEntity } from '../base.entity';
import { ITelegramInfo } from '@core-ui/goat-tap-types';

@Entity()
export class TelegramInfo extends BaseEntity implements ITelegramInfo {
  @Column()
  first_name!: string;

  @Column()
  last_name?: string | undefined;

  @Column()
  username?: string | undefined;

  @Column()
  phone?: string | undefined;

  @Column()
  about?: string | undefined;

  @Column()
  telegramId!: string | number;

  @Column()
  photo_url?: string;

  @Column()
  auth_date?: string;
}
