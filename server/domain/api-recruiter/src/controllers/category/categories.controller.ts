

import { CategoriesService } from '@/services/categories/categories.service';
import { CategoriesController as CoreCategoriesController } from "@core-modules/categories"
import { NEST_COMMON, NEST_MICRO_SERVICE } from "@core-api/nest-core"
import { RecruiterCategoryMessages } from "@core-api/microservices-utils"

const { Controller } = NEST_COMMON

@Controller("/categories")
export class CategoriesController extends CoreCategoriesController {
  constructor(protected readonly categoryService: CategoriesService) {
    super(categoryService);
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: RecruiterCategoryMessages.GET_ONE_CATEGORY })
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

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: RecruiterCategoryMessages.GET_MANY_CATEGORIES })
  async handleGetManyCategoriesMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const categories: any = await this.categoryService.find(data);
      return categories;
    } catch (error) {
      console.error('Error processing get many categories message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: RecruiterCategoryMessages.GET_ALL_CATEGORIES })
  async handleGetAllCategoriesMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const categories: any = await this.categoryService.find(data);
      return categories;
    } catch (error) {
      console.error('Error processing get many categories message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: RecruiterCategoryMessages.CREATE_CATEGORY })
  async handleCreateCategoryMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const categories: any = await this.categoryService.create(data);
      return categories;
    } catch (error) {
      console.error('Error processing get many categories message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: RecruiterCategoryMessages.UPDATE_CATEGORY })
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

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: RecruiterCategoryMessages.PATCH_UPDATE_CATEGORY })
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

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: RecruiterCategoryMessages.DELETE_CATEGORY })
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
