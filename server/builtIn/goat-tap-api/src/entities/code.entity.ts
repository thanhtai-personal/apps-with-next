import { Column, Entity } from '@core-api/nest-typeorm-postgres';
import { BaseEntity } from './base.entity';
import { CodeTypeEnum, ICode } from '@core-ui/goat-tap-types';

@Entity('auth_codes')
export class CodeEntity extends BaseEntity implements ICode {
  @Column({ name: "authority", type: "varchar" })
  authority?: string;

  @Column({ name: "code", type: "varchar" })
  code!: string;

  @Column({ type: "timestamp", name: 'valid_from' })
  validFrom!: Date;

  @Column({ type: "timestamp", name: 'valid_to' })
  validTo!: Date;

  @Column({ type: "boolean", name: 'can_resend' })
  canResend!: boolean;

  @Column({ name: "type", type: 'varchar' })
  type!: CodeTypeEnum;
}
