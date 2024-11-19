import { IThingEntity } from "@core-modules/core"

export interface IRole extends IThingEntity {
  name?: string;
  description?: string;
  type?: string;
}