import { DeepPartial, InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { NEST_COMMON } from '@core-api/nest-core';
import { ISearchQuery, INonPagingResponse, IPagingResponse } from "@core-ui/common-types"
import { CommentEntityToCommentResponse } from "../mappers/comment.response.mapper";
import { CommentEntity } from "../entities";
import { ICommentResponse } from "../interfaces";
import { ICommentFilter } from "../interfaces/ICommentFilter";
import { CreateCommentDto, UpdateCommentDto } from "../dtos";
import { CommentCreateDTOToEntityMapper } from "../mappers/comment.create.mapper";
import { BaseService } from "@core-modules/core";

const { HttpException, HttpStatus, Injectable, NotFoundException } = NEST_COMMON;

@Injectable()
export class CommentsService extends BaseService {
  constructor(
    @InjectRepository(CommentEntity)
    protected commentsRepository: Repository<CommentEntity>,
  ) {
    super();
  }

  async findAll<T = ICommentFilter, K = ICommentResponse>(filter: ISearchQuery<T>): Promise<INonPagingResponse<K>> {
    const comments = await this.commentsRepository.find({ where: { deletedAt: undefined }, relations: this.populate });
    return {
      data: CommentEntityToCommentResponse.maps(comments),
    } as INonPagingResponse<K>;
  }

  async find<T = ICommentFilter, K = ICommentResponse>(filter: ISearchQuery<T>): Promise<IPagingResponse<K>> {
    const comments = await this.commentsRepository.find({ where: { deletedAt: undefined }, relations: this.populate });
    return {
      data: CommentEntityToCommentResponse.maps(comments),
      paging: {
        limit: filter.paging?.limit || 20,
        offset: filter.paging?.offset || 0,
        total: comments.length,
      }
    } as IPagingResponse<K>;
  }

  async findOne<K = ICommentResponse>(id: number): Promise<K | null> {
    const comment = await this.commentsRepository.findOne({ where: { id: id }, relations: this.populate });
    return comment ? CommentEntityToCommentResponse.map(comment) as K : null;
  }

  async update<T = UpdateCommentDto, K = ICommentResponse>(commentId: number, updateCommentDto: T) {
    const comment = await this.commentsRepository.findOne({
      where: {
        id: commentId,
      }, relations: this.populate
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    const { id, ...nestedData } = updateCommentDto as UpdateCommentDto;
    Object.assign(comment, nestedData);

    const rsComment = await this.commentsRepository.save(comment);
    return CommentEntityToCommentResponse.map(rsComment) as K;
  }

  async patchUpdate<T = DeepPartial<UpdateCommentDto>, K = ICommentResponse>(commentId: number, updateCommentDto: T): Promise<K> {
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId }, relations: this.populate,
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    const { id, ...nestedData } = updateCommentDto as UpdateCommentDto;
    Object.assign(comment, nestedData);

    const rsComment = await this.commentsRepository.save(comment);
    return CommentEntityToCommentResponse.map(rsComment) as K;
  }

  async create<T = CreateCommentDto, K = ICommentResponse>(requestedComment: T): Promise<K> {
    try {
      const comment = this.commentsRepository.create(CommentCreateDTOToEntityMapper.map(requestedComment as CreateCommentDto));
      await this.commentsRepository.save(comment);
      return CommentEntityToCommentResponse.map(comment) as K;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.commentsRepository.delete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}