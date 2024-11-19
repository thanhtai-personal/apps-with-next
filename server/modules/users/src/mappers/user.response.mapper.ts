
import { UserEntity } from "../entities";
import { IUserResponse } from "../interfaces";

export class UserEntityToUserResponse {
  public static map(source: UserEntity, options?: any): IUserResponse {
    const rsSource = source as UserEntity;
    return rsSource as UserEntity
  }

  public static maps(sources: UserEntity[], options?: any): IUserResponse[] {
    return sources.map((item) => UserEntityToUserResponse.map(item));
  }
}