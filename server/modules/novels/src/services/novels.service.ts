import { DeepPartial, InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { NEST_COMMON } from '@core-api/nest-core';
import { ISearchQuery, INonPagingResponse, IPagingResponse } from "@core-ui/common-types"
import { NovelEntityToNovelResponse } from "../mappers/novel.response.mapper";
import { NovelEntity } from "../entities";
import { INovelResponse } from "../interfaces";
import { INovelFilter } from "../interfaces/INovelFilter";
import { CreateNovelDto, UpdateNovelDto } from "../dtos";
import { NovelCreateDTOToEntityMapper } from "../mappers/novel.create.mapper";
import { BaseService } from "@core-modules/core";

const { HttpException, HttpStatus, Injectable, NotFoundException } = NEST_COMMON;

@Injectable()
export class NovelsService extends BaseService {
  constructor(
    @InjectRepository(NovelEntity)
    protected novelsRepository: Repository<NovelEntity>,
  ) {
    super();
  }

  async findAll<T = INovelFilter, K = INovelResponse>(filter: ISearchQuery<T>): Promise<INonPagingResponse<K>> {
    const novels = await this.novelsRepository.find({ where: { deletedAt: undefined }, relations: this.populate });
    return {
      data: NovelEntityToNovelResponse.maps(novels),
    } as INonPagingResponse<K>;
  }

  async find<T = INovelFilter, K = INovelResponse>(filter: ISearchQuery<T>): Promise<IPagingResponse<K>> {
    const novels = await this.novelsRepository.find({ where: { deletedAt: undefined }, relations: this.populate });
    return {
      data: NovelEntityToNovelResponse.maps(novels),
      paging: {
        limit: filter.paging?.limit || 20,
        offset: filter.paging?.offset || 0,
        total: novels.length,
      }
    } as IPagingResponse<K>;
  }

  async findOne<K = INovelResponse>(id: number): Promise<K | null> {
    const novel = await this.novelsRepository.findOne({ where: { id: id }, relations: this.populate });
    return novel ? NovelEntityToNovelResponse.map(novel) as K : null;
  }

  async update<T = UpdateNovelDto, K = INovelResponse>(novelId: number, updateNovelDto: T) {
    const novel = await this.novelsRepository.findOne({
      where: {
        id: novelId,
      }, relations: this.populate
    });
    if (!novel) {
      throw new NotFoundException('Novel not found');
    }
    const { id, ...nestedData } = updateNovelDto as UpdateNovelDto;
    Object.assign(novel, nestedData);

    const rsNovel = await this.novelsRepository.save(novel);
    return NovelEntityToNovelResponse.map(rsNovel) as K;
  }

  async patchUpdate<T = DeepPartial<UpdateNovelDto>, K = INovelResponse>(novelId: number, updateNovelDto: T): Promise<K> {
    const novel = await this.novelsRepository.findOne({
      where: { id: novelId }, relations: this.populate,
    });
    if (!novel) {
      throw new NotFoundException('Novel not found');
    }
    const { id, ...nestedData } = updateNovelDto as UpdateNovelDto;
    Object.assign(novel, nestedData);

    const rsNovel = await this.novelsRepository.save(novel);
    return NovelEntityToNovelResponse.map(rsNovel) as K;
  }

  async create<T = CreateNovelDto, K = INovelResponse>(requestedNovel: T): Promise<K> {
    try {
      const novel = this.novelsRepository.create(NovelCreateDTOToEntityMapper.map(requestedNovel as CreateNovelDto));
      await this.novelsRepository.save(novel);
      return NovelEntityToNovelResponse.map(novel) as K;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.novelsRepository.delete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}