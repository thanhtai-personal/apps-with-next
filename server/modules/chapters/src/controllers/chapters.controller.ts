
import { Response } from "express"
import { NEST_COMMON, NEST_MICRO_SERVICE } from "@core-api/nest-core";
import { ChaptersService } from "../services/chapters.service";
import { UpdateChapterDto, CreateChapterDto } from "../dtos";
import { INonPagingResponse, ISearchQuery, IPagingResponse } from "@core-ui/common-types";
import { IChapterFilter } from "../interfaces/IChapterFilter";
import { IChapterResponse } from "../interfaces";
import { ChapterMessages } from "@core-api/microservices-utils"

const { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Res, Delete, Post } = NEST_COMMON;

@Controller("/chapters")
export class ChaptersController {
  constructor(protected readonly chapterService: ChaptersService) { }

  @Get("/:chapterId")
  async getOne(
    @Param("chapterId")
    chapterId: number,
    @Res()
    res: Response
  ) {
    try {
      if (!chapterId) throw new HttpException("No chapter Id", HttpStatus.INTERNAL_SERVER_ERROR);
      const chapter = await this.chapterService.findOne(chapterId);
      return res.status(HttpStatus.OK).send(chapter)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: ChapterMessages.GET_ONE_CHAPTER })
  async handleGetOneChapterMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const chapter = await this.chapterService.findOne(data.chapterId);
      return chapter;
    } catch (error) {
      console.error('Error processing get one chapter message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Get()
  async getMany(
    @Query() query: ISearchQuery<IChapterFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<IChapterResponse> = await this.chapterService.find(query) as IPagingResponse<IChapterResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: ChapterMessages.GET_MANY_CHAPTERS })
  async handleGetManyChaptersMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const chapters: IPagingResponse<IChapterResponse> = await this.chapterService.find(data) as IPagingResponse<IChapterResponse>;
      return chapters;
    } catch (error) {
      console.error('Error processing get many chapters message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: ISearchQuery<IChapterFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<IChapterResponse> = await this.chapterService.findAll(query) as INonPagingResponse<IChapterResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: ChapterMessages.GET_ALL_CHAPTERS })
  async handleGetAllChaptersMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const chapters: IPagingResponse<IChapterResponse> = await this.chapterService.find(data) as IPagingResponse<IChapterResponse>;
      return chapters;
    } catch (error) {
      console.error('Error processing get many chapters message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Post()
  async createPermisison(
    @Body()
    createPermisisonDto: CreateChapterDto,
    @Res()
    res: Response
  ) {
    try {
      const chapter = await this.chapterService.create(createPermisisonDto);
      return res.status(HttpStatus.OK).send(chapter);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: ChapterMessages.CREATE_CHAPTER })
  async handleCreateChapterMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const chapters: IPagingResponse<IChapterResponse> = await this.chapterService.create(data) as IPagingResponse<IChapterResponse>;
      return chapters;
    } catch (error) {
      console.error('Error processing get many chapters message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Put("/:chapterId")
  async updateChapter(
    @Param('chapterId')
    chapterId: number,
    @Body()
    updateChapterDto: UpdateChapterDto,
    @Res()
    res: Response
  ) {
    try {
      const chapter = await this.chapterService.update(Number(chapterId), updateChapterDto);
      return res.status(HttpStatus.OK).send(chapter);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: ChapterMessages.UPDATE_CHAPTER })
  async handleUpdateChapterMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const chapter = await this.chapterService.update(Number(data.chapterId), data.body);
      return chapter;
    } catch (error) {
      console.error('Error processing get many chapters message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Patch("/:chapterId")
  async patchUpdate(
    @Param('chapterId')
    chapterId: number,
    @Body()
    patchUpdateDto: Partial<UpdateChapterDto>,
    @Res()
    res: Response
  ) {
    try {
      const chapter = await this.chapterService.patchUpdate(Number(chapterId), patchUpdateDto);
      return res.status(HttpStatus.OK).send(chapter);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: ChapterMessages.PATCH_UPDATE_CHAPTER })
  async handlePatchUpdateChapterMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const chapter = await this.chapterService.patchUpdate(Number(data.chapterId), data.body);
      return chapter;
    } catch (error) {
      console.error('Error processing get many chapters message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Delete("/:chapterId")
  async delete(
    @Param('chapterId')
    chapterId: number,
    @Res()
    res: Response
  ) {
    try {
      const chapter = await this.chapterService.delete(Number(chapterId));
      return res.status(HttpStatus.OK).send(chapter);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: ChapterMessages.DELETE_CHAPTER })
  async handleDeleteChapter(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const chapter = await this.chapterService.delete(Number(data));
      return chapter;
    } catch (error) {
      console.error('Error processing get many chapters message', error);
      throw error; // Or handle the error appropriately
    }
  }

}
