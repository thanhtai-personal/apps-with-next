
import { Response } from "express"
import { NEST_COMMON, NEST_MICRO_SERVICE } from "@core-api/nest-core";
import { NovelsService } from "../services/novels.service";
import { UpdateNovelDto, CreateNovelDto } from "../dtos";
import { INonPagingResponse, ISearchQuery, IPagingResponse } from "@core-ui/common-types";
import { INovelFilter } from "../interfaces/INovelFilter";
import { INovelResponse } from "../interfaces";
import { NovelMessages } from "@core-api/microservices-utils"

const { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Res, Delete, Post } = NEST_COMMON;

@Controller("/novels")
export class NovelsController {
  constructor(protected readonly novelService: NovelsService) { }

  @Get("/:novelId")
  async getOne(
    @Param("novelId")
    novelId: number,
    @Res()
    res: Response
  ) {
    try {
      if (!novelId) throw new HttpException("No novel Id", HttpStatus.INTERNAL_SERVER_ERROR);
      const novel = await this.novelService.findOne(novelId);
      return res.status(HttpStatus.OK).send(novel)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: NovelMessages.GET_ONE_NOVEL })
  async handleGetOneNovelMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const novel = await this.novelService.findOne(data.novelId);
      return novel;
    } catch (error) {
      console.error('Error processing get one novel message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Get()
  async getMany(
    @Query() query: ISearchQuery<INovelFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<INovelResponse> = await this.novelService.find(query) as IPagingResponse<INovelResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: NovelMessages.GET_MANY_NOVELS })
  async handleGetManyNovelsMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const novels: IPagingResponse<INovelResponse> = await this.novelService.find(data) as IPagingResponse<INovelResponse>;
      return novels;
    } catch (error) {
      console.error('Error processing get many novels message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: ISearchQuery<INovelFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<INovelResponse> = await this.novelService.findAll(query) as INonPagingResponse<INovelResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: NovelMessages.GET_ALL_NOVELS })
  async handleGetAllNovelsMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const novels: IPagingResponse<INovelResponse> = await this.novelService.find(data) as IPagingResponse<INovelResponse>;
      return novels;
    } catch (error) {
      console.error('Error processing get many novels message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Post()
  async createPermisison(
    @Body()
    createPermisisonDto: CreateNovelDto,
    @Res()
    res: Response
  ) {
    try {
      const novel = await this.novelService.create(createPermisisonDto);
      return res.status(HttpStatus.OK).send(novel);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: NovelMessages.CREATE_NOVEL })
  async handleCreateNovelMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const novels: IPagingResponse<INovelResponse> = await this.novelService.create(data) as IPagingResponse<INovelResponse>;
      return novels;
    } catch (error) {
      console.error('Error processing get many novels message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Put("/:novelId")
  async updateNovel(
    @Param('novelId')
    novelId: number,
    @Body()
    updateNovelDto: UpdateNovelDto,
    @Res()
    res: Response
  ) {
    try {
      const novel = await this.novelService.update(Number(novelId), updateNovelDto);
      return res.status(HttpStatus.OK).send(novel);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: NovelMessages.UPDATE_NOVEL })
  async handleUpdateNovelMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const novel = await this.novelService.update(Number(data.novelId), data.body);
      return novel;
    } catch (error) {
      console.error('Error processing get many novels message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Patch("/:novelId")
  async patchUpdate(
    @Param('novelId')
    novelId: number,
    @Body()
    patchUpdateDto: Partial<UpdateNovelDto>,
    @Res()
    res: Response
  ) {
    try {
      const novel = await this.novelService.patchUpdate(Number(novelId), patchUpdateDto);
      return res.status(HttpStatus.OK).send(novel);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: NovelMessages.PATCH_UPDATE_NOVEL })
  async handlePatchUpdateNovelMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const novel = await this.novelService.patchUpdate(Number(data.novelId), data.body);
      return novel;
    } catch (error) {
      console.error('Error processing get many novels message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Delete("/:novelId")
  async delete(
    @Param('novelId')
    novelId: number,
    @Res()
    res: Response
  ) {
    try {
      const novel = await this.novelService.delete(Number(novelId));
      return res.status(HttpStatus.OK).send(novel);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: NovelMessages.DELETE_NOVEL })
  async handleDeleteNovel(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const novel = await this.novelService.delete(Number(data));
      return novel;
    } catch (error) {
      console.error('Error processing get many novels message', error);
      throw error; // Or handle the error appropriately
    }
  }

}
