import { BoostEntity } from "@/entities"
import { IBoostResponse } from "@core-ui/goat-tap-types"

export class BoostEntityToBoostResponseMapper {
  public static map(source: BoostEntity, options?: any): IBoostResponse {
    return {
      id: source.id,
      level: source.level,
      pointsPerTap: source.pointsPerTap,
      nextLevelPointsPerTap: source.nextLevelPointsPerTap,
      expiredAt: source.expiredAt,
      goatPrice: source.goatPrice,
      tonPrice: source.tonPrice,
      type: source.type,
    }
  }

  public static maps(sources: BoostEntity[], options?: any): IBoostResponse[] {
    return sources.map((item) => BoostEntityToBoostResponseMapper.map(item))
  }
}