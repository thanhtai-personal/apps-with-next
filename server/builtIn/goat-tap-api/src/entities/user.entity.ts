import { Column, Entity, Index, ManyToOne, OneToMany } from "@core-api/nest-typeorm-postgres";
import { TelegramInfo } from "./embeddeds/telegram.entity";
import { IUser } from "@core-ui/goat-tap-types";
import { TonWalletInfo } from "./embeddeds/tonWallet.entity";
import { SquadEntity } from "./squad.entity";
import { FamousPersonEntity } from "./famousPerson.entity";
import { BaseEntity } from "./base.entity";
import { BoostEntity } from "./boost.entity";

// UserEntity
@Entity('users')
export class UserEntity extends BaseEntity implements IUser {
  @Column({ name: "telegram_info", type: 'jsonb', nullable: false })
  telegramInfo!: TelegramInfo;

  @Column({ name: "ton_wallet_info", type: 'jsonb', nullable: true })
  tonWalletInfo?: TonWalletInfo;

  @Column({ name: "points", type: 'numeric', nullable: false, default: 0 })
  points?: number;

  @Column({ name: "referral_by", type: 'bigint', nullable: true })
  referralBy?: number;

  @Column({ name: "referral_code", type: 'varchar', nullable: true })
  referralCode?: string;

  @Column({ name: "referral_params", type: 'varchar', nullable: true })
  referralParams?: string;

  @Column({ name: "energy", type: 'int', nullable: false, default: 2500 })
  energy?: number;

  @Column({ name: "renew_energy_times", type: 'int', nullable: false, default: 3 })
  renewEnergyTimes?: number;

  @ManyToOne((_type) => SquadEntity, (squad) => squad.users)
  squad?: SquadEntity;

  @Index({ unique: false })
  @ManyToOne(() => FamousPersonEntity, (famousPerson) => famousPerson.users)
  famousPerson?: FamousPersonEntity;

  @OneToMany(() => BoostEntity, (charge) => charge.user, { cascade: false })
  boosts?: BoostEntity[];
}