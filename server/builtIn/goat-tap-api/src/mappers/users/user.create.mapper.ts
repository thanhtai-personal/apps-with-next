import { UserEntity } from "@/entities"
import { IUserCreation } from "@core-ui/goat-tap-types"

export class UserCreateDTOToEntityMapper {
  public static map(source: IUserCreation, options?: any): UserEntity {
    const rsSource = source as UserEntity;
    if (source.famousPersonId && options.famousPerson) {
      rsSource.famousPerson = options.famousPerson;
    }
    return rsSource as UserEntity
  }
}