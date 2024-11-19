import { NEST_COMMON } from "@core-api/nest-core";

const { SetMetadata } = NEST_COMMON

export const CatchExceptions = () => SetMetadata('catchExceptions', true);