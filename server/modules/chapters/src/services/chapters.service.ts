import { DeepPartial, InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { NEST_COMMON } from '@core-api/nest-core';
import { ISearchQuery, INonPagingResponse, IPagingResponse } from "@core-ui/common-types"
import { ChapterEntityToChapterResponse } from "../mappers/chapter.response.mapper";
import { ChapterEntity } from "../entities";
import { IChapterResponse } from "../interfaces";
import { IChapterFilter } from "../interfaces/IChapterFilter";
import { CreateChapterDto, UpdateChapterDto } from "../dtos";
import { ChapterCreateDTOToEntityMapper } from "../mappers/chapter.create.mapper";
import { BaseService } from "@core-modules/core";

const { HttpException, HttpStatus, Injectable, NotFoundException } = NEST_COMMON;

@Injectable()
export class ChaptersService extends BaseService {
  constructor(
    @InjectRepository(ChapterEntity)
    protected chaptersRepository: Repository<ChapterEntity>,
  ) {
    super();
  }

  async findAll<T = IChapterFilter, K = IChapterResponse>(filter: ISearchQuery<T>): Promise<INonPagingResponse<K>> {
    const chapters = await this.chaptersRepository.find({ where: { deletedAt: undefined }, relations: this.populate });
    return {
      data: ChapterEntityToChapterResponse.maps(chapters),
    } as INonPagingResponse<K>;
  }

  async find<T = IChapterFilter, K = IChapterResponse>(filter: ISearchQuery<T>): Promise<IPagingResponse<K>> {
    const chapters = await this.chaptersRepository.find({ where: { deletedAt: undefined }, relations: this.populate });
    return {
      data: ChapterEntityToChapterResponse.maps(chapters),
      paging: {
        limit: filter.paging?.limit || 20,
        offset: filter.paging?.offset || 0,
        total: chapters.length,
      }
    } as IPagingResponse<K>;
  }

  async findOne<K = IChapterResponse>(id: number): Promise<K | null> {
    const chapter = await this.chaptersRepository.findOne({ where: { id: id }, relations: this.populate });
    return chapter ? ChapterEntityToChapterResponse.map(chapter) as K : null;
  }

  async update<T = UpdateChapterDto, K = IChapterResponse>(chapterId: number, updateChapterDto: T) {
    const chapter = await this.chaptersRepository.findOne({
      where: {
        id: chapterId,
      }, relations: this.populate
    });
    if (!chapter) {
      throw new NotFoundException('Chapter not found');
    }
    const { id, ...nestedData } = updateChapterDto as UpdateChapterDto;
    Object.assign(chapter, nestedData);

    const rsChapter = await this.chaptersRepository.save(chapter);
    return ChapterEntityToChapterResponse.map(rsChapter) as K;
  }

  async patchUpdate<T = DeepPartial<UpdateChapterDto>, K = IChapterResponse>(chapterId: number, updateChapterDto: T): Promise<K> {
    const chapter = await this.chaptersRepository.findOne({
      where: { id: chapterId }, relations: this.populate,
    });
    if (!chapter) {
      throw new NotFoundException('Chapter not found');
    }
    const { id, ...nestedData } = updateChapterDto as UpdateChapterDto;
    Object.assign(chapter, nestedData);

    const rsChapter = await this.chaptersRepository.save(chapter);
    return ChapterEntityToChapterResponse.map(rsChapter) as K;
  }

  async create<T = CreateChapterDto, K = IChapterResponse>(requestedChapter: T): Promise<K> {
    try {
      const chapter = this.chaptersRepository.create(ChapterCreateDTOToEntityMapper.map(requestedChapter as CreateChapterDto));
      await this.chaptersRepository.save(chapter);
      return ChapterEntityToChapterResponse.map(chapter) as K;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.chaptersRepository.delete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}