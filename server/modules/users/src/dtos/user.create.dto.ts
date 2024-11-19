import { IUserCreation } from "../interfaces";

export class CreateUserDto implements IUserCreation {
  username?: string;
  email?: string;
  password?: string;
  salt?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  avatar?: string;
}