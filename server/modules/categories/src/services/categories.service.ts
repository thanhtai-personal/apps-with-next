import { DeepPartial, InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { NEST_COMMON } from '@core-api/nest-core';
import { ISearchQuery, INonPagingResponse, IPagingResponse } from "@core-ui/common-types"
import { CategoryEntityToCategoryResponse } from "../mappers/category.response.mapper";
import { CategoryEntity } from "../entities";
import { ICategoryResponse } from "../interfaces";
import { ICategoryFilter } from "../interfaces/ICategoryFilter";
import { CreateCategoryDto, UpdateCategoryDto } from "../dtos";
import { CategoryCreateDTOToEntityMapper } from "../mappers/category.create.mapper";
import { BaseService } from "@core-modules/core";

const { HttpException, HttpStatus, Injectable, NotFoundException } = NEST_COMMON;

@Injectable()
export class CategoriesService extends BaseService {
  constructor(
    @InjectRepository(CategoryEntity)
    protected categoriesRepository: Repository<CategoryEntity>,
  ) {
    super();
  }

  async findAll<T = ICategoryFilter, K = ICategoryResponse>(filter: ISearchQuery<T>): Promise<INonPagingResponse<K>> {
    const categories = await this.categoriesRepository.find({ where: { deletedAt: undefined }, relations: this.populate });
    return {
      data: CategoryEntityToCategoryResponse.maps(categories),
    } as INonPagingResponse<K>;
  }

  async find<T = ICategoryFilter, K = ICategoryResponse>(filter: ISearchQuery<T>): Promise<IPagingResponse<K>> {
    const categories = await this.categoriesRepository.find({ where: { deletedAt: undefined }, relations: this.populate });
    return {
      data: CategoryEntityToCategoryResponse.maps(categories),
      paging: {
        limit: filter.paging?.limit || 20,
        offset: filter.paging?.offset || 0,
        total: categories.length,
      }
    } as IPagingResponse<K>;
  }

  async findOne<K = ICategoryResponse>(id: number): Promise<K | null> {
    const category = await this.categoriesRepository.findOne({ where: { id: id }, relations: this.populate });
    return category ? CategoryEntityToCategoryResponse.map(category) as K : null;
  }

  async update<T = UpdateCategoryDto, K = ICategoryResponse>(categoryId: number, updateCategoryDto: T) {
    const category = await this.categoriesRepository.findOne({
      where: {
        id: categoryId,
      }, relations: this.populate
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const { id, ...nestedData } = updateCategoryDto as UpdateCategoryDto;
    Object.assign(category, nestedData);

    const rsCategory = await this.categoriesRepository.save(category);
    return CategoryEntityToCategoryResponse.map(rsCategory) as K;
  }

  async patchUpdate<T = DeepPartial<UpdateCategoryDto>, K = ICategoryResponse>(categoryId: number, updateCategoryDto: T): Promise<K> {
    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId }, relations: this.populate,
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const { id, ...nestedData } = updateCategoryDto as UpdateCategoryDto;
    Object.assign(category, nestedData);

    const rsCategory = await this.categoriesRepository.save(category);
    return CategoryEntityToCategoryResponse.map(rsCategory) as K;
  }

  async create<T = CreateCategoryDto, K = ICategoryResponse>(requestedCategory: T): Promise<K> {
    try {
      const category = this.categoriesRepository.create(CategoryCreateDTOToEntityMapper.map(requestedCategory as CreateCategoryDto));
      await this.categoriesRepository.save(category);
      return CategoryEntityToCategoryResponse.map(category) as K;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.categoriesRepository.delete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}