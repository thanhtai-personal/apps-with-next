export enum CodeTypeEnum {
  Welcome = 'welcome',
  Confirmation = 'confirmation',
}

export interface ICode {
  id: number;
  authority?: string;
  code: string;
  validFrom: Date;
  validTo: Date;
  canResend: boolean;
  type: CodeTypeEnum;
}
