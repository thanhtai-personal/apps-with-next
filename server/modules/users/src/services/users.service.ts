import { DeepPartial, InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { NEST_COMMON } from '@core-api/nest-core';
import { ISearchQuery, INonPagingResponse, IPagingResponse } from "@core-ui/common-types"
import { UserEntityToUserResponse } from "../mappers/user.response.mapper";
import { UserEntity } from "../entities";
import { IUserResponse } from "../interfaces";
import { IUserFilter } from "../interfaces/IUserFilter";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { UserCreateDTOToEntityMapper } from "../mappers/user.create.mapper";
import { BaseService } from "@core-modules/core";

const { HttpException, HttpStatus, Injectable, NotFoundException } = NEST_COMMON;

@Injectable()
export class UsersService extends BaseService {
  constructor(
    @InjectRepository(UserEntity)
    protected usersRepository: Repository<UserEntity>,
  ) {
    super();
  }

  async findAll<T = IUserFilter, K = IUserResponse>(filter: ISearchQuery<T>): Promise<INonPagingResponse<K>> {
    const users = await this.usersRepository.find({ where: { deletedAt: undefined }, relations: this.populate });
    return {
      data: UserEntityToUserResponse.maps(users),
    } as INonPagingResponse<K>;
  }

  async find<T = IUserFilter, K = IUserResponse>(filter: ISearchQuery<T>): Promise<IPagingResponse<K>> {
    const users = await this.usersRepository.find({ where: { deletedAt: undefined }, relations: this.populate });
    return {
      data: UserEntityToUserResponse.maps(users),
      paging: {
        limit: filter.paging?.limit || 20,
        offset: filter.paging?.offset || 0,
        total: users.length,
      }
    } as IPagingResponse<K>;
  }

  async findOne<K = IUserResponse>(id: number): Promise<K | null> {
    const user = await this.usersRepository.findOne({ where: { id: id }, relations: this.populate });
    return user ? UserEntityToUserResponse.map(user) as K : null;
  }

  async update<T = UpdateUserDto, K = IUserResponse>(userId: number, updateUserDto: T) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      }, relations: this.populate
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { id, ...nestedData } = updateUserDto as UpdateUserDto;
    Object.assign(user, nestedData);

    const rsUser = await this.usersRepository.save(user);
    return UserEntityToUserResponse.map(rsUser) as K;
  }

  async patchUpdate<T = DeepPartial<UpdateUserDto>, K = IUserResponse>(userId: number, updateUserDto: T): Promise<K> {
    const user = await this.usersRepository.findOne({
      where: { id: userId }, relations: this.populate,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { id, ...nestedData } = updateUserDto as UpdateUserDto;
    Object.assign(user, nestedData);

    const rsUser = await this.usersRepository.save(user);
    return UserEntityToUserResponse.map(rsUser) as K;
  }

  async create<T = CreateUserDto, K = IUserResponse>(requestedUser: T): Promise<K> {
    try {
      const user = this.usersRepository.create(UserCreateDTOToEntityMapper.map(requestedUser as CreateUserDto));
      await this.usersRepository.save(user);
      return UserEntityToUserResponse.map(user) as K;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.usersRepository.delete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}