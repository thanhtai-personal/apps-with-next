import { IPagingFilter } from "@core-sdk/core";

export interface UserFilter extends Partial<IPagingFilter> {
  id?: number | string;
  email?: string;
  firstName?: string;
  lastName?: string;
  status?: string;
  phoneNumber?: string;
}
