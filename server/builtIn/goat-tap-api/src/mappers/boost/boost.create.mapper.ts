import { BoostEntity } from "@/entities"
import { IBoostCreation } from "@core-ui/goat-tap-types"

export class BoostCreationToBoostEntityMapper {
  public static map(source: IBoostCreation, options?: any): BoostEntity {
    const rsSource = source as unknown as BoostEntity;
    if (source.userId && options.user) {
      rsSource.user = options.user
    }
    return rsSource as BoostEntity
  }
}