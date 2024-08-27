import { Controller, Get, HttpException, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { SummaryService } from '@/services/summary/summary.service';
import { Response } from "express"
import { AuthGuard } from '@/guards/auth.guard';

@Controller("/summary")
@UseGuards(AuthGuard)
export class SummaryController {
  constructor(private readonly service: SummaryService) { }

  @Get("/tap")
  async getTapData(
    @Req()
    req: Request & { authUser: any },
    @Res()
    res: Response
  ) {
    try {
      const data = await this.service.getTapData(req.authUser.user);
      return res.status(HttpStatus.OK).send({
        data
      })
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
