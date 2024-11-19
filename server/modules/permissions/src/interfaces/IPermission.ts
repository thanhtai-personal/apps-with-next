import { IThingEntity } from "@core-modules/core"

export interface IPermission extends IThingEntity {
  name?: string;
  description?: string;
}