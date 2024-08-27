import { IPagingFilter } from "@core-sdk/core";
export interface PermissionFilter extends Partial<IPagingFilter> {
  id?: number;
  name?: string;
}
