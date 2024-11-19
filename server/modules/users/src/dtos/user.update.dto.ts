import { IUserUpdating } from "../interfaces";

export class UpdateUserDto implements IUserUpdating {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  salt?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  avatar?: string;
}