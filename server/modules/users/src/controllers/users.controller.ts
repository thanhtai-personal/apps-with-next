
import { Response } from "express"
import { NEST_COMMON, NEST_MICRO_SERVICE } from "@core-api/nest-core";
import { UsersService } from "../services/users.service";
import { UpdateUserDto, CreateUserDto } from "../dtos";
import { INonPagingResponse, ISearchQuery, IPagingResponse } from "@core-ui/common-types";
import { IUserFilter } from "../interfaces/IUserFilter";
import { IUserResponse } from "../interfaces";
import { UserMessages } from "@core-api/microservices-utils"

const { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Res, Delete, Post } = NEST_COMMON;

@Controller("/users")
export class UsersController {
  constructor(protected readonly userService: UsersService) { }

  @Get("/:userId")
  async getOne(
    @Param("userId")
    userId: number,
    @Res()
    res: Response
  ) {
    try {
      if (!userId) throw new HttpException("No user Id", HttpStatus.INTERNAL_SERVER_ERROR);
      const user = await this.userService.findOne(userId);
      return res.status(HttpStatus.OK).send(user)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: UserMessages.GET_ONE_USER })
  async handleGetOneUserMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const user = await this.userService.findOne(data.userId);
      return user;
    } catch (error) {
      console.error('Error processing get one user message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Get()
  async getMany(
    @Query() query: ISearchQuery<IUserFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<IUserResponse> = await this.userService.find(query) as IPagingResponse<IUserResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: UserMessages.GET_MANY_USERS })
  async handleGetManyUsersMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const users: IPagingResponse<IUserResponse> = await this.userService.find(data) as IPagingResponse<IUserResponse>;
      return users;
    } catch (error) {
      console.error('Error processing get many users message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: ISearchQuery<IUserFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<IUserResponse> = await this.userService.findAll(query) as INonPagingResponse<IUserResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: UserMessages.GET_ALL_USERS })
  async handleGetAllUsersMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const users: IPagingResponse<IUserResponse> = await this.userService.find(data) as IPagingResponse<IUserResponse>;
      return users;
    } catch (error) {
      console.error('Error processing get many users message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Post()
  async createPermisison(
    @Body()
    createPermisisonDto: CreateUserDto,
    @Res()
    res: Response
  ) {
    try {
      const user = await this.userService.create(createPermisisonDto);
      return res.status(HttpStatus.OK).send(user);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: UserMessages.CREATE_USER })
  async handleCreateUserMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const users: IPagingResponse<IUserResponse> = await this.userService.create(data) as IPagingResponse<IUserResponse>;
      return users;
    } catch (error) {
      console.error('Error processing get many users message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Put("/:userId")
  async updateUser(
    @Param('userId')
    userId: number,
    @Body()
    updateUserDto: UpdateUserDto,
    @Res()
    res: Response
  ) {
    try {
      const user = await this.userService.update(Number(userId), updateUserDto);
      return res.status(HttpStatus.OK).send(user);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: UserMessages.UPDATE_USER })
  async handleUpdateUserMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const user = await this.userService.update(Number(data.userId), data.body);
      return user;
    } catch (error) {
      console.error('Error processing get many users message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Patch("/:userId")
  async patchUpdate(
    @Param('userId')
    userId: number,
    @Body()
    patchUpdateDto: Partial<UpdateUserDto>,
    @Res()
    res: Response
  ) {
    try {
      const user = await this.userService.patchUpdate(Number(userId), patchUpdateDto);
      return res.status(HttpStatus.OK).send(user);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: UserMessages.PATCH_UPDATE_USER })
  async handlePatchUpdateUserMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const user = await this.userService.patchUpdate(Number(data.userId), data.body);
      return user;
    } catch (error) {
      console.error('Error processing get many users message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Delete("/:userId")
  async delete(
    @Param('userId')
    userId: number,
    @Res()
    res: Response
  ) {
    try {
      const user = await this.userService.delete(Number(userId));
      return res.status(HttpStatus.OK).send(user);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: UserMessages.DELETE_USER })
  async handleDeleteUser(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const user = await this.userService.delete(Number(data));
      return user;
    } catch (error) {
      console.error('Error processing get many users message', error);
      throw error; // Or handle the error appropriately
    }
  }

}
