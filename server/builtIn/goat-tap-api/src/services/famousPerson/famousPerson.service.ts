import { CachingConfig } from '@/config';
import { queryAllFamousPeopleOrderBygroupPoints } from '@/database/queries/famousPeople.query';
import { UpdateFamousPersonDto } from '@/dtos/famousPeople/famousPeople.update.dto';
import { FamousPersonEntity } from '@/entities/famousPerson.entity';
import { FamousPeopleEntityToFamousPeopleResponse } from '@/mappers/famousPeople/famousPeople.response.mapper';
import { DeepPartial, FindManyOptions, InjectRepository, Raw, Repository, SelectQueryBuilder } from '@core-api/nest-typeorm-postgres';
import { IFamousPeopleFilter, IFamousPeopleResponse, IPagination } from '@core-ui/goat-tap-types';
import { IPagingFilter } from '@core-ui/goat-tap-types/dist/interfaces/common/IPagingFilter';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FamousPersonService {
  constructor(
    @InjectRepository(FamousPersonEntity)
    private famousPersonRepository: Repository<FamousPersonEntity>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) { }

  async getCachedData(key: string) {
    return await this.cacheManager.get(key)
  }

  async findAll(filter: IPagingFilter & IFamousPeopleFilter): Promise<IPagination<IFamousPeopleResponse>> {
    const queryBuilder = queryAllFamousPeopleOrderBygroupPoints(this.famousPersonRepository, filter)
    const [data, count] = await queryBuilder.getManyAndCount();

    const response: IPagination<IFamousPeopleResponse> = {
      data: FamousPeopleEntityToFamousPeopleResponse.maps(data),
      total: count,
      limit: filter.limit,
      offset: filter.offset,
    };

    return response;
  }

  async findOne(id: number): Promise<IFamousPeopleResponse | null> {
    const person = await this.famousPersonRepository.findOneBy({ id });
    return person ? FamousPeopleEntityToFamousPeopleResponse.map(person) : null;
  }

  async remove(id: number): Promise<void> {
    await this.famousPersonRepository.delete(id);
  }

  async patchUpdate(pId: number, updateUserDto: DeepPartial<UpdateFamousPersonDto>) {
    const person = await this.famousPersonRepository.findOne({
      where: {
        id: pId,
      },
    });
    if (!person) {
      throw new Error('User not found');
    }
    const { id, ...nestedData } = updateUserDto;
    Object.assign(person, nestedData);
    return FamousPeopleEntityToFamousPeopleResponse.map(await this.famousPersonRepository.save(person));
  }
}