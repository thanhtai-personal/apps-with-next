
import { Response } from "express"
import { NEST_COMMON } from "@core-api/nest-core";
import { NovelsService } from "@/services/novels/novels.service";
import { CreateNovelDto, IAppCenterNovelFilter, IAppCenterNovelResponse, UpdateNovelDto } from "@core-api/appcenter-materials";
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types"
import { AuthGuard } from "@/guards/auth.guard";

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

  @Get()
  async getMany(
    @Query() query: IAppCenterNovelFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<IAppCenterNovelResponse> = await this.novelService.find(query);
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/all")
  @NEST_COMMON.UseGuards(AuthGuard)
  async getAll(
    @Query() query: IAppCenterNovelFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<IAppCenterNovelResponse> = await this.novelService.findAll(query);
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @NEST_COMMON.UseGuards(AuthGuard)
  async createNovel(
    @Body()
    createNovelDto: CreateNovelDto,
    @Res()
    res: Response
  ) {
    try {
      const novel = await this.novelService.create(createNovelDto);
      return res.status(HttpStatus.OK).send(novel);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:novelId")
  @NEST_COMMON.UseGuards(AuthGuard)
  async updateNovel(
    @Param('novelId')
    novelId: number,
    @Body()
    updateNovelDto: UpdateNovelDto,
    @Res()
    res: Response
  ) {
    try {
      const novel: IAppCenterNovelResponse = await this.novelService.update(Number(novelId), updateNovelDto);
      return res.status(HttpStatus.OK).send(novel);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/:novelId")
  @NEST_COMMON.UseGuards(AuthGuard)
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

  @Delete("/:novelId")
  @NEST_COMMON.UseGuards(AuthGuard)
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
}
