
import { Response } from "express"
import { NEST_COMMON, NEST_MICRO_SERVICE } from "@core-api/nest-core";
import { CategoriesService } from "../services/categories.service";
import { UpdateCategoryDto, CreateCategoryDto } from "../dtos";
import { INonPagingResponse, ISearchQuery, IPagingResponse } from "@core-ui/common-types";
import { ICategoryFilter } from "../interfaces/ICategoryFilter";
import { ICategoryResponse } from "../interfaces";
import { NovelCategoryMessages } from "@core-api/microservices-utils"

const { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Res, Delete, Post } = NEST_COMMON;

@Controller("/categories")
export class CategoriesController {
  constructor(protected readonly categoryService: CategoriesService) { }

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

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: NovelCategoryMessages.GET_ONE_CATEGORY })
  async handleGetOneCategoryMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const category = await this.categoryService.findOne(data.categoryId);
      return category;
    } catch (error) {
      console.error('Error processing get one category message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Get()
  async getMany(
    @Query() query: ISearchQuery<ICategoryFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<ICategoryResponse> = await this.categoryService.find(query) as IPagingResponse<ICategoryResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: NovelCategoryMessages.GET_MANY_CATEGORIES })
  async handleGetManyCategoriesMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const categories: IPagingResponse<ICategoryResponse> = await this.categoryService.find(data) as IPagingResponse<ICategoryResponse>;
      return categories;
    } catch (error) {
      console.error('Error processing get many categories message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: ISearchQuery<ICategoryFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<ICategoryResponse> = await this.categoryService.findAll(query) as INonPagingResponse<ICategoryResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: NovelCategoryMessages.GET_ALL_CATEGORIES })
  async handleGetAllCategoriesMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const categories: IPagingResponse<ICategoryResponse> = await this.categoryService.find(data) as IPagingResponse<ICategoryResponse>;
      return categories;
    } catch (error) {
      console.error('Error processing get many categories message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Post()
  async createPermisison(
    @Body()
    createPermisisonDto: CreateCategoryDto,
    @Res()
    res: Response
  ) {
    try {
      const category = await this.categoryService.create(createPermisisonDto);
      return res.status(HttpStatus.OK).send(category);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: NovelCategoryMessages.CREATE_CATEGORY })
  async handleCreateCategoryMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const categories: IPagingResponse<ICategoryResponse> = await this.categoryService.create(data) as IPagingResponse<ICategoryResponse>;
      return categories;
    } catch (error) {
      console.error('Error processing get many categories message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Put("/:categoryId")
  async updateCategory(
    @Param('categoryId')
    categoryId: number,
    @Body()
    updateCategoryDto: UpdateCategoryDto,
    @Res()
    res: Response
  ) {
    try {
      const category = await this.categoryService.update(Number(categoryId), updateCategoryDto);
      return res.status(HttpStatus.OK).send(category);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: NovelCategoryMessages.UPDATE_CATEGORY })
  async handleUpdateCategoryMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const category = await this.categoryService.update(Number(data.categoryId), data.body);
      return category;
    } catch (error) {
      console.error('Error processing get many categories message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Patch("/:categoryId")
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

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: NovelCategoryMessages.PATCH_UPDATE_CATEGORY })
  async handlePatchUpdateCategoryMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const category = await this.categoryService.patchUpdate(Number(data.categoryId), data.body);
      return category;
    } catch (error) {
      console.error('Error processing get many categories message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Delete("/:categoryId")
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

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: NovelCategoryMessages.DELETE_CATEGORY })
  async handleDeleteCategory(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const category = await this.categoryService.delete(Number(data));
      return category;
    } catch (error) {
      console.error('Error processing get many categories message', error);
      throw error; // Or handle the error appropriately
    }
  }

}
