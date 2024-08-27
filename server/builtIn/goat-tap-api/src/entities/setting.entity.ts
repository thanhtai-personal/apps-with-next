import { ISetting } from "@core-ui/goat-tap-types";
import { BaseEntity } from "./base.entity";
import { Entity, PrimaryColumn, Column } from "@core-api/nest-typeorm-postgres";


@Entity('core_settings')
export class SettingEntity extends BaseEntity implements ISetting {
  @PrimaryColumn({ type: 'varchar', length: 250 })
  key!: string;

  @Column({ name: 'value_int', nullable: true })
  valueInt?: number;

  @Column({ name: 'value_float', nullable: true })
  valueFloat?: number;

  @Column({ name: 'value_string', nullable: true })
  valueString?: string;

  @Column({ name: 'value_json', type: 'json', nullable: true })
  valueJson?: Record<string, any> | any[];

}
