import { Body, Controller, HttpException, HttpStatus, Param, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from "express"
import { AuthGuard } from '@/guards/auth.guard';
import { BoostService } from '@/services/boost/boost.service';
import { BoostUpdateDto } from '@/dtos/boost/boost.update.dto';
import { BuyBoostDto } from '@/dtos/boost/boost.buy.dto';

@Controller("/boosts")
@UseGuards(AuthGuard)
export class BoostController {
  constructor(private readonly boostService: BoostService) { }

  @Patch("/:boostId")
  async patchUpdate(
    @Param('boostId')
    boostId: string | number,
    @Body()
    patchUpdateDto: Partial<BoostUpdateDto>,
    @Res()
    res: Response
  ) {
    try {
      const user = await this.boostService.patchUpdate(Number(boostId), patchUpdateDto);
      return res.status(HttpStatus.OK).send(user);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("buy")
  async buyBoost(
    @Req()
    request: Request & { authUser: any },
    @Query()
    buyBoostDto: BuyBoostDto,
    @Res()
    res: Response
  ) {
    try {
      if (!request.authUser.user) throw new HttpException("Missing auth data", HttpStatus.UNAUTHORIZED);
      const user = await this.boostService.buy(request.authUser.user, buyBoostDto);
      return res.status(HttpStatus.OK).send(user);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
