import { Repository, SelectQueryBuilder } from '@core-api/nest-typeorm-postgres';
import { FamousPersonEntity } from '@/entities/famousPerson.entity';
import { IFamousPeopleFilter, IPagingFilter } from '@core-ui/goat-tap-types';

export const queryAllFamousPeopleOrderBygroupPoints = (
  repository: Repository<FamousPersonEntity>,
  filter: IFamousPeopleFilter & IPagingFilter
): SelectQueryBuilder<FamousPersonEntity> => {
  const { limit, offset, name } = filter;

  const queryBuilder: SelectQueryBuilder<FamousPersonEntity>
    = repository.createQueryBuilder('famousPerson')
      .leftJoinAndSelect('famousPerson.users', 'user')
      .select([
        'famousPerson.id',
        'famousPerson.name',
        'famousPerson.image',
        'famousPerson.linkTwitter',
        'famousPerson.twitterHandler',
        'famousPerson.project',
        'famousPerson.groupPoints',
        'famousPerson.note',
      ])
      // .addSelect('SUM(user.points) AS total_points')
      .groupBy('famousPerson.id');
  if (name) {
    //TODO: should prevent SQL injection for param name
    queryBuilder.andWhere('famousPerson.name ILIKE :name', { name: `%${name}%` });
  }
  queryBuilder.orderBy('famousPerson.groupPoints', 'DESC')
    .offset(offset)
    .limit(limit);

  return queryBuilder;
};
