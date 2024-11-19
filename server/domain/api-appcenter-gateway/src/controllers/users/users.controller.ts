
import { Response } from "express"
import { NEST_COMMON } from "@core-api/nest-core";
import { UsersService } from "@/services/users/users.service";
import { CreateUserDto, IAppCenterUserFilter, IAppCenterUserResponse, UpdateUserDto } from "@core-api/appcenter-materials";
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types"
import { AuthGuard } from "@/guards/auth.guard";

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

  @Get()
  async getMany(
    @Query() query: IAppCenterUserFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<IAppCenterUserResponse> = await this.userService.find(query);
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: IAppCenterUserFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<IAppCenterUserResponse> = await this.userService.findAll(query);
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @NEST_COMMON.UseGuards(AuthGuard)
  async createUser(
    @Body()
    createUserDto: CreateUserDto,
    @Res()
    res: Response
  ) {
    try {
      const user = await this.userService.create(createUserDto);
      return res.status(HttpStatus.OK).send(user);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:userId")
  @NEST_COMMON.UseGuards(AuthGuard)
  async updateUser(
    @Param('userId')
    userId: number,
    @Body()
    updateUserDto: UpdateUserDto,
    @Res()
    res: Response
  ) {
    try {
      const user: IAppCenterUserResponse = await this.userService.update(Number(userId), updateUserDto);
      return res.status(HttpStatus.OK).send(user);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/:userId")
  @NEST_COMMON.UseGuards(AuthGuard)
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

  @Delete("/:userId")
  @NEST_COMMON.UseGuards(AuthGuard)
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
}
