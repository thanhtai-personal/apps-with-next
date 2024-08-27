import { Column, Entity } from "@core-api/nest-typeorm-postgres";
import { BaseEntity } from "./base.entity";
import { ITonOpenPack } from "@core-ui/goat-tap-types";

@Entity('ton_openpacks')
export class TonOpenPackEntity extends BaseEntity implements ITonOpenPack {

  @Column({ type: 'varchar', default: '' })
  hash_id!: string;

  @Column({ type: 'varchar', default: '' })
  source!: string;

  @Column({ type: 'varchar', default: '' })
  destination!: string;

  @Column({ type: 'varchar', default: '' })
  user_id!: string;

  @Column({ type: 'int', default: 0 })
  pack_id!: number;

  @Column({ type: 'int', default: 0 })
  amount!: number;

  @Column({ type: 'varchar', default: 0 })
  coin_paid!: string;

  @Column({ type: 'boolean', default: false })
  synced!: boolean;

  @Column({ type: 'varchar', default: '' })
  note!: string;
}
