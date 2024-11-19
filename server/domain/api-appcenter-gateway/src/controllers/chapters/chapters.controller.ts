
import { Response } from "express"
import { NEST_COMMON } from "@core-api/nest-core";
import { ChaptersService } from "@/services/chapters/chapters.service";
import { CreateChapterDto, IAppCenterChapterFilter, IAppCenterChapterResponse, UpdateChapterDto } from "@core-api/appcenter-materials";
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types"
import { AuthGuard } from "@/guards/auth.guard";

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

  @Get()
  async getMany(
    @Query() query: IAppCenterChapterFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<IAppCenterChapterResponse> = await this.chapterService.find(query);
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: IAppCenterChapterFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<IAppCenterChapterResponse> = await this.chapterService.findAll(query);
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @NEST_COMMON.UseGuards(AuthGuard)
  async createChapter(
    @Body()
    createChapterDto: CreateChapterDto,
    @Res()
    res: Response
  ) {
    try {
      const chapter = await this.chapterService.create(createChapterDto);
      return res.status(HttpStatus.OK).send(chapter);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:chapterId")
  @NEST_COMMON.UseGuards(AuthGuard)
  async updateChapter(
    @Param('chapterId')
    chapterId: number,
    @Body()
    updateChapterDto: UpdateChapterDto,
    @Res()
    res: Response
  ) {
    try {
      const chapter: IAppCenterChapterResponse = await this.chapterService.update(Number(chapterId), updateChapterDto);
      return res.status(HttpStatus.OK).send(chapter);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/:chapterId")
  @NEST_COMMON.UseGuards(AuthGuard)
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

  @Delete("/:chapterId")
  @NEST_COMMON.UseGuards(AuthGuard)
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
}
