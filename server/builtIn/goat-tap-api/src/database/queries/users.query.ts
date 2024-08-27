import { Repository, SelectQueryBuilder } from '@core-api/nest-typeorm-postgres';
import { IPagingFilter, IUserFilter } from '@core-ui/goat-tap-types';
import { UserEntity } from "@/entities";

export const searchUser = (
  repository: Repository<UserEntity>,
  filter: IUserFilter & IPagingFilter
): SelectQueryBuilder<UserEntity> => {
  const { limit, offset, referralBy } = filter;

  const queryBuilder = repository.createQueryBuilder('user');

  // Select all fields from the user entity
  const select = `
      id,
      telegram_info,
      ton_wallet_info,
      referral_by,
      referral_code,
      referral_params,
      points,
      energy,
      renew_energy_times
  `
  queryBuilder.select(select);

  if (referralBy) {
    queryBuilder.andWhere('user.referral_by = :referralBy', { referralBy });
  }

  if (offset !== undefined) {
    queryBuilder.offset(Number(offset));
  }

  if (limit !== undefined) {
    queryBuilder.limit(Number(limit));
  }

  return queryBuilder;
};
