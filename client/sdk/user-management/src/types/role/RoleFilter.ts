import { IPagingFilter } from "@core-sdk/core";

export interface RoleFilter extends Partial<IPagingFilter> {
  id?: number | string;
  name?: string;
}
