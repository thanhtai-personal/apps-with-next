import { Column, Entity } from '@core-api/nest-typeorm-postgres';
import { BaseEntity } from '../base.entity';
import { IInMsg } from '@core-ui/goat-tap-types';

@Entity()
export class InMsg extends BaseEntity implements IInMsg {
  @Column()
  bounce?: boolean;

  @Column()
  bounced?: boolean;
  
  @Column()
  createdLt?: Date;
  
  @Column()
  destination?: string;
  
  @Column()
  fwdFee?: number | string;
  
  @Column()
  hash?: string;
  
  @Column()
  ihrDisabled?: boolean;
  
  @Column()
  ihrFee?: string;
  
  @Column()
  importFee?: number | string;
  
  @Column()
  initState?: string;

  @Column()
  messageContentBody?: string;

  @Column()
  messageContentDecodedComment?: string;

  @Column()
  messageContentDecodedType?: string;

  @Column()
  messageContentHash?: string;

  @Column()
  source?: string;

  @Column()
  opcode?: string;

  @Column()
  value?: string | number;
}
