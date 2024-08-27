import { Column, Entity } from "@core-api/nest-typeorm-postgres";
import { ITransaction } from "@core-ui/goat-tap-types";
import { BaseEntity } from "./base.entity";
import { AccountState } from "./embeddeds/transactionAccountState.entity";
import { BlockRef } from "./embeddeds/blockRef.enrity";
import { Description } from "./embeddeds/description.entity";
import { InMsg } from "./embeddeds/inMsg.entity";

// TransactionEntity
@Entity('transactions')
export class TransactionEntity extends BaseEntity implements ITransaction {
  @Column({ name: "account", type: 'varchar', nullable: false })
  account!: string;

  @Column({ name: "account_state_after", type: 'jsonb', nullable: true })
  accountStateAfter?: AccountState;
  
  @Column({ name: "account_state_before", type: 'jsonb', nullable: true })
  accountStateBefore?: AccountState;

  @Column({ name: "block_ref", type: 'jsonb', nullable: true })
  blockRef?: BlockRef;

  @Column({ name: "description", type: 'jsonb', nullable: true })
  description?: Description;

  @Column({ name: "end_status", type: 'varchar', nullable: true })
  endStatus?: string;

  @Column({ name: "hash", type: 'varchar', nullable: true })
  hash?: string;

  @Column({ name: "in_msg", type: 'jsonb', nullable: true })
  inMsg?: InMsg;

  @Column({ name: "lt", type: 'numeric', nullable: true })
  lt?: string | number;

  @Column({ name: "mc_block_seqno", type: 'numeric', nullable: true })
  mcBlockSeqno?: number;

  @Column({ name: "now", type: 'varchar', nullable: true })
  now?: Date;

  @Column({ name: "orig_status", type: 'varchar', nullable: true })
  origStatus?: string;

  @Column({ name: "prev_trans_hash", type: 'varchar', nullable: true })
  prevTransHash?: string;

  @Column({ name: "prev_trans_lt", type: 'numeric', nullable: true })
  prevTransLt?: string | number;

  @Column({ name: "total_fees", type: 'numeric', nullable: true })
  totalFees?: string | number;

  @Column({ name: "processed", type: 'boolean', default: false })
  processed?: boolean;

  @Column({ name: "value", type: 'numeric', nullable: true })
  value?: string | number;

  @Column({ name: "source", type: 'varchar', nullable: true})
  source?: string;

  @Column({ name: "destination", type: 'varchar', nullable: true })
  destination?: string;
  
}