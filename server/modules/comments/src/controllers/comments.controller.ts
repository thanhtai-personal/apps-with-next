
import { Response } from "express"
import { NEST_COMMON, NEST_MICRO_SERVICE } from "@core-api/nest-core";
import { CommentsService } from "../services/comments.service";
import { UpdateCommentDto, CreateCommentDto } from "../dtos";
import { INonPagingResponse, ISearchQuery, IPagingResponse } from "@core-ui/common-types";
import { ICommentFilter } from "../interfaces/ICommentFilter";
import { ICommentResponse } from "../interfaces";
import { NovelCommentMessages } from "@core-api/microservices-utils"

const { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Res, Delete, Post } = NEST_COMMON;

@Controller("/comments")
export class CommentsController {
  constructor(protected readonly commentService: CommentsService) { }

  @Get("/:commentId")
  async getOne(
    @Param("commentId")
    commentId: number,
    @Res()
    res: Response
  ) {
    try {
      if (!commentId) throw new HttpException("No comment Id", HttpStatus.INTERNAL_SERVER_ERROR);
      const comment = await this.commentService.findOne(commentId);
      return res.status(HttpStatus.OK).send(comment)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: NovelCommentMessages.GET_ONE_COMMENT })
  async handleGetOneCommentMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const comment = await this.commentService.findOne(data.commentId);
      return comment;
    } catch (error) {
      console.error('Error processing get one comment message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Get()
  async getMany(
    @Query() query: ISearchQuery<ICommentFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<ICommentResponse> = await this.commentService.find(query) as IPagingResponse<ICommentResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: NovelCommentMessages.GET_MANY_COMMENTS })
  async handleGetManyCommentsMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const comments: IPagingResponse<ICommentResponse> = await this.commentService.find(data) as IPagingResponse<ICommentResponse>;
      return comments;
    } catch (error) {
      console.error('Error processing get many comments message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: ISearchQuery<ICommentFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<ICommentResponse> = await this.commentService.findAll(query) as INonPagingResponse<ICommentResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: NovelCommentMessages.GET_ALL_COMMENTS })
  async handleGetAllCommentsMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const comments: IPagingResponse<ICommentResponse> = await this.commentService.find(data) as IPagingResponse<ICommentResponse>;
      return comments;
    } catch (error) {
      console.error('Error processing get many comments message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Post()
  async createPermisison(
    @Body()
    createPermisisonDto: CreateCommentDto,
    @Res()
    res: Response
  ) {
    try {
      const comment = await this.commentService.create(createPermisisonDto);
      return res.status(HttpStatus.OK).send(comment);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: NovelCommentMessages.CREATE_COMMENT })
  async handleCreateCommentMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const comments: IPagingResponse<ICommentResponse> = await this.commentService.create(data) as IPagingResponse<ICommentResponse>;
      return comments;
    } catch (error) {
      console.error('Error processing get many comments message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Put("/:commentId")
  async updateComment(
    @Param('commentId')
    commentId: number,
    @Body()
    updateCommentDto: UpdateCommentDto,
    @Res()
    res: Response
  ) {
    try {
      const comment = await this.commentService.update(Number(commentId), updateCommentDto);
      return res.status(HttpStatus.OK).send(comment);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: NovelCommentMessages.UPDATE_COMMENT })
  async handleUpdateCommentMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const comment = await this.commentService.update(Number(data.commentId), data.body);
      return comment;
    } catch (error) {
      console.error('Error processing get many comments message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Patch("/:commentId")
  async patchUpdate(
    @Param('commentId')
    commentId: number,
    @Body()
    patchUpdateDto: Partial<UpdateCommentDto>,
    @Res()
    res: Response
  ) {
    try {
      const comment = await this.commentService.patchUpdate(Number(commentId), patchUpdateDto);
      return res.status(HttpStatus.OK).send(comment);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: NovelCommentMessages.PATCH_UPDATE_COMMENT })
  async handlePatchUpdateCommentMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const comment = await this.commentService.patchUpdate(Number(data.commentId), data.body);
      return comment;
    } catch (error) {
      console.error('Error processing get many comments message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Delete("/:commentId")
  async delete(
    @Param('commentId')
    commentId: number,
    @Res()
    res: Response
  ) {
    try {
      const comment = await this.commentService.delete(Number(commentId));
      return res.status(HttpStatus.OK).send(comment);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: NovelCommentMessages.DELETE_COMMENT })
  async handleDeleteComment(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const comment = await this.commentService.delete(Number(data));
      return comment;
    } catch (error) {
      console.error('Error processing get many comments message', error);
      throw error; // Or handle the error appropriately
    }
  }

}
