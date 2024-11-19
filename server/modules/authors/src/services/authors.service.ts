import { DeepPartial, InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { NEST_COMMON } from '@core-api/nest-core';
import { ISearchQuery, INonPagingResponse, IPagingResponse } from "@core-ui/common-types"
import { AuthorEntityToAuthorResponse } from "../mappers/author.response.mapper";
import { AuthorEntity } from "../entities";
import { IAuthorResponse } from "../interfaces";
import { IAuthorFilter } from "../interfaces/IAuthorFilter";
import { CreateAuthorDto, UpdateAuthorDto } from "../dtos";
import { AuthorCreateDTOToEntityMapper } from "../mappers/author.create.mapper";
import { BaseService } from "@core-modules/core";

const { HttpException, HttpStatus, Injectable, NotFoundException } = NEST_COMMON;

@Injectable()
export class AuthorsService extends BaseService {
  constructor(
    @InjectRepository(AuthorEntity)
    protected authorsRepository: Repository<AuthorEntity>,
  ) {
    super();
  }

  async findAll<T = IAuthorFilter, K = IAuthorResponse>(filter: ISearchQuery<T>): Promise<INonPagingResponse<K>> {
    const authors = await this.authorsRepository.find({ where: { deletedAt: undefined }, relations: this.populate });
    return {
      data: AuthorEntityToAuthorResponse.maps(authors),
    } as INonPagingResponse<K>;
  }

  async find<T = IAuthorFilter, K = IAuthorResponse>(filter: ISearchQuery<T>): Promise<IPagingResponse<K>> {
    const authors = await this.authorsRepository.find({ where: { deletedAt: undefined }, relations: this.populate });
    return {
      data: AuthorEntityToAuthorResponse.maps(authors),
      paging: {
        limit: filter.paging?.limit || 20,
        offset: filter.paging?.offset || 0,
        total: authors.length,
      }
    } as IPagingResponse<K>;
  }

  async findOne<K = IAuthorResponse>(id: number): Promise<K | null> {
    const author = await this.authorsRepository.findOne({ where: { id: id }, relations: this.populate });
    return author ? AuthorEntityToAuthorResponse.map(author) as K : null;
  }

  async update<T = UpdateAuthorDto, K = IAuthorResponse>(authorId: number, updateAuthorDto: T) {
    const author = await this.authorsRepository.findOne({
      where: {
        id: authorId,
      }, relations: this.populate
    });
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    const { id, ...nestedData } = updateAuthorDto as UpdateAuthorDto;
    Object.assign(author, nestedData);

    const rsAuthor = await this.authorsRepository.save(author);
    return AuthorEntityToAuthorResponse.map(rsAuthor) as K;
  }

  async patchUpdate<T = DeepPartial<UpdateAuthorDto>, K = IAuthorResponse>(authorId: number, updateAuthorDto: T): Promise<K> {
    const author = await this.authorsRepository.findOne({
      where: { id: authorId }, relations: this.populate,
    });
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    const { id, ...nestedData } = updateAuthorDto as UpdateAuthorDto;
    Object.assign(author, nestedData);

    const rsAuthor = await this.authorsRepository.save(author);
    return AuthorEntityToAuthorResponse.map(rsAuthor) as K;
  }

  async create<T = CreateAuthorDto, K = IAuthorResponse>(requestedAuthor: T): Promise<K> {
    try {
      const author = this.authorsRepository.create(AuthorCreateDTOToEntityMapper.map(requestedAuthor as CreateAuthorDto));
      await this.authorsRepository.save(author);
      return AuthorEntityToAuthorResponse.map(author) as K;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.authorsRepository.delete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}