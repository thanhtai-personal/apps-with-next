

import { Controller, Get, HttpException, HttpStatus, Param, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from "express"
import { AuthGuard } from '@/guards/auth.guard';
import { TonApiService } from "@/services/ton/ton.service";

@Controller("/ton")
@UseGuards(AuthGuard)
export class TonController {
  constructor(private readonly tonService: TonApiService) { }
  @Get("/token-transfered")
  async checkIsTokenTransfered(
    @Req()
    req: Request & { authUser: any },

    @Query("packPrice")
    packPrice: number,

    @Res()
    res: Response
  ) {
    try {
      const authUser = req.authUser;
      if (!authUser) {
        return res.status(HttpStatus.UNAUTHORIZED).send("No authorization");
      }
      const rs = await this.tonService.checkIsTokenTransfered(authUser.user!.id, packPrice);
      return res.status(HttpStatus.OK).send(rs)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
