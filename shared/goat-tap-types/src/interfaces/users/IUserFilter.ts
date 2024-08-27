import { IPagingFilter } from "../common/IPagingFilter";

export interface IUserFilter extends Partial<IPagingFilter> {
  id?: number | string;
  username?: string;
  telegramId?: string;
  referralBy?: number | string;
}
