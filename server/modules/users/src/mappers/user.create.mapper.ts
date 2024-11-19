import { UserEntity } from "../entities";
import { IUserCreation } from "../interfaces";

export class UserCreateDTOToEntityMapper {
  public static map(source: IUserCreation, options?: any): UserEntity {
    const rsSource = source as UserEntity;
    return rsSource as UserEntity
  }
  public static maps(sources: IUserCreation[], options?: any): UserEntity[] {
    return sources.map((item) => UserCreateDTOToEntityMapper.map(item));
  }
}