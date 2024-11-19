import { IThingEntity } from "@core-modules/core"

export interface ICategory extends IThingEntity {
  name?: string;
  description?: string;
  image?: string;
  icon?: string;
}