import { IAuthorCreation } from "../interfaces";

export class CreateAuthorDto implements IAuthorCreation {
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