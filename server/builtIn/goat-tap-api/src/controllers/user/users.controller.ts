

import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from '@/services/users/users.service';
import { Response } from "express"
import { AuthGuard } from '@/guards/auth.guard';
import { UpdateUserDto } from '@/dtos/users/user.update.dto';
import { ValidateTapAction } from '@/decorators/ValidateTapAction.decorator';
import { IPagination, IPagingFilter, IUserFilter, IUserResponse } from "@core-ui/goat-tap-types";

@Controller("/users")
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) { }

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
    @Query() query: IPagingFilter & IUserFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagination<IUserResponse> = await this.userService.findAll({
        ...(query || []),
        limit: query.limit || 10,
        offset: query.offset || 0,
      }) as IPagination<IUserResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:userId")
  async updateUser(
    @Req()
    @ValidateTapAction()
    req: Request,
    @Param('userId')
    userId: string | number,
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

  @Patch("/:userId")
  async patchUpdate(
    @Req()
    @ValidateTapAction()
    req: Request,
    @Param('userId')
    userId: string | number,
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

  @Patch("/:userId/points")
  async updatePoints(
    @Req()
    @ValidateTapAction()
    req: Request,
    @Param('userId')
    userId: string | number,
    @Body()
    patchUpdateDto: { points: number },
    @Res()
    res: Response
  ) {
    try {
      const user = await this.userService.updatePoints(Number(userId), Number(patchUpdateDto.points));
      return res.status(HttpStatus.OK).send(user);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/:userId/energy")
  async updateEnergy(
    @Req()
    @ValidateTapAction()
    req: Request,
    @Param('userId')
    userId: string | number,
    @Body()
    patchUpdateDto: { energy: number },
    @Res()
    res: Response
  ) {
    try {
      const user = await this.userService.updateEnergy(Number(userId), Number(patchUpdateDto.energy));
      return res.status(HttpStatus.OK).send(user);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
