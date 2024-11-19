import { IAuthorUpdating } from "../interfaces";

export class UpdateAuthorDto implements IAuthorUpdating {
  id?: number;
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