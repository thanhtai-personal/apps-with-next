import { UserEntity } from "@/entities"
import { BoostType, IUserResponse } from "@core-ui/goat-tap-types"
import { FamousPeopleEntityToFamousPeopleResponse } from "../famousPeople/famousPeople.response.mapper"

export class UserEntityToUserResponse {
  public static map(source: UserEntity, options?: any): IUserResponse {
    return {
      id: source.id,
      telegramInfo: source.telegramInfo,
      tonWalletInfo: source.tonWalletInfo,
      referralBy: source.referralBy,
      referralCode: source.referralCode,
      referralParams: source.referralParams,
      points: source.points,
      // squad: source.squad
      //   ? SquadEntityToSquadResponse.map(source.squad) : undefined,
      famousPerson: source.famousPerson
        ? FamousPeopleEntityToFamousPeopleResponse.map(source.famousPerson) : undefined,
      energy: source.energy,
      boosts: source.boosts && source.boosts.length > 0 ? source.boosts : [
        {
          id: 0,
          level: 1,
          type: BoostType.Normal,
          pointsPerTap: 1,
          nextLevelPointsPerTap: 1,
          goatPrice: 0,
          tonPrice: 0,
          expiredAt: undefined,
        }
      ],
      renewEnergyTimes: source.renewEnergyTimes,
    }
  }

  public static rawMap(source: any, options?: any): IUserResponse {
    return {
      id: source.id,
      telegramInfo: {
        first_name: source.telegram_info?.first_name,
        about: source.telegram_info?.about,
        telegramId: source.telegram_info?.telegramId,
        auth_date: source.telegram_info?.auth_date,
        last_name: source.telegram_info?.last_name,
        phone: source.telegram_info?.phone,
        photo_url: source.telegram_info?.photo_url,
        username: source.telegram_info?.username,
      },
      tonWalletInfo: source.ton_wallet_info,
      referralBy: source.referral_by,
      referralCode: source.referral_code,
      referralParams: source.referral_params,
      points: source.points,
      // squad: source.squad
      //   ? SquadEntityToSquadResponse.map(source.squad) : undefined,
      famousPerson: source.famousPerson
        ? FamousPeopleEntityToFamousPeopleResponse.map(source.famousPerson) : undefined,
      energy: source.energy,
      boosts: source.boosts && source.boosts.length > 0 ? source.boosts : [
        {
          id: 0,
          level: 1,
          type: BoostType.Normal,
          pointsPerTap: 1,
          nextLevelPointsPerTap: 1,
          goatPrice: 0,
          tonPrice: 0,
          expiredAt: undefined,
        }
      ],
      renewEnergyTimes: source.renew_energy_times,
    }
  }

  public static maps(sources: UserEntity[], options?: any): IUserResponse[] {
    return sources.map((item) => UserEntityToUserResponse.map(item))
  }
}