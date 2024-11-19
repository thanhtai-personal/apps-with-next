import { IThingEntity } from "@core-modules/core"

export interface IUser extends IThingEntity {
  username?: string;
  email?: string;
  password?: string;
  salt?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  avatar?: string;
}