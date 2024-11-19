import { UserEntity } from "../entities";
import { IUserUpdating } from "../interfaces";

export class UserUpdateDTOToEntityMapper {
  public static map(source: IUserUpdating, options?: any): UserEntity {
    const rsSource = source as UserEntity;
    return rsSource as UserEntity
  }
  public static maps(sources: IUserUpdating[], options?: any): UserEntity[] {
    return sources.map((item) => UserUpdateDTOToEntityMapper.map(item));
  }
}