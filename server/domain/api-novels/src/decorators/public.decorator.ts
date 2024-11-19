import { NEST_COMMON } from "@core-api/nest-core";

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => NEST_COMMON.SetMetadata(IS_PUBLIC_KEY, true);