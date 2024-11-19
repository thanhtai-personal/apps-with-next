import { IThingEntity } from "@core-modules/core"

export interface IAuthor extends IThingEntity {
  name?: string;
  description?: string;
  htmlDescription?: string;
  points?: number;
  level?: number;
  nickName?: string;
  realName?: string;
  birthday?: string;
  gender?: string;
  avatar?: string;
}