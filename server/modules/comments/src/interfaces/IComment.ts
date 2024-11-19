import { IThingEntity } from "@core-modules/core"

export interface IComment extends IThingEntity {
  username?: string;
  email?: string;
  content?: string;
  htmlContent?: string;
  avatar?: string;
}