
import { Response } from "express"
import { NEST_COMMON } from "@core-api/nest-core";
import { NovelCategoriesService } from "@/services/novelCategories/categories.novel.service";
import { CreateCategoryDto, IAppCenterCategoryFilter, IAppCenterCategoryResponse, UpdateCategoryDto } from "@core-api/appcenter-materials";
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types"
import { AuthGuard } from "@/guards/auth.guard";

const { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Res, Delete, Post } = NEST_COMMON;

@Controller("/novel/categories")
export class NovelCategoriesController {
  constructor(protected readonly categoryService: NovelCategoriesService) { }

  @Get("/:categoryId")
  async getOne(
    @Param("categoryId")
    categoryId: number,
    @Res()
    res: Response
  ) {
    try {
      if (!categoryId) throw new HttpException("No category Id", HttpStatus.INTERNAL_SERVER_ERROR);
      const category = await this.categoryService.findOne(categoryId);
      return res.status(HttpStatus.OK).send(category)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getMany(
    @Query() query: IAppCenterCategoryFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<IAppCenterCategoryResponse> = await this.categoryService.find(query);
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: IAppCenterCategoryFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<IAppCenterCategoryResponse> = await this.categoryService.findAll(query);
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @NEST_COMMON.UseGuards(AuthGuard)
  async createCategory(
    @Body()
    createCategoryDto: CreateCategoryDto,
    @Res()
    res: Response
  ) {
    try {
      const category = await this.categoryService.create(createCategoryDto);
      return res.status(HttpStatus.OK).send(category);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:categoryId")
  @NEST_COMMON.UseGuards(AuthGuard)
  async updateCategory(
    @Param('categoryId')
    categoryId: number,
    @Body()
    updateCategoryDto: UpdateCategoryDto,
    @Res()
    res: Response
  ) {
    try {
      const category: IAppCenterCategoryResponse = await this.categoryService.update(Number(categoryId), updateCategoryDto);
      return res.status(HttpStatus.OK).send(category);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/:categoryId")
  @NEST_COMMON.UseGuards(AuthGuard)
  async patchUpdate(
    @Param('categoryId')
    categoryId: number,
    @Body()
    patchUpdateDto: Partial<UpdateCategoryDto>,
    @Res()
    res: Response
  ) {
    try {
      const category = await this.categoryService.patchUpdate(Number(categoryId), patchUpdateDto);
      return res.status(HttpStatus.OK).send(category);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete("/:categoryId")
  @NEST_COMMON.UseGuards(AuthGuard)
  async delete(
    @Param('categoryId')
    categoryId: number,
    @Res()
    res: Response
  ) {
    try {
      const category = await this.categoryService.delete(Number(categoryId));
      return res.status(HttpStatus.OK).send(category);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
