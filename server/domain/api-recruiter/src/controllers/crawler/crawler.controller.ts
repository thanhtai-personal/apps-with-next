

import { AnyDayCrawlerService } from '@/services/anyDayCrawler/anyDayCrawler.service';
import { JobMessages } from "@core-api/microservices-utils";
import { NEST_COMMON, NEST_MICRO_SERVICE } from "@core-api/nest-core";
import { Response } from "express"

const {  Body, Controller, Get, HttpException, HttpStatus, Post, Res } = NEST_COMMON

@Controller("/crawler")
export class CrawlerController {
  constructor(
    private readonly anyDayCrawlerService: AnyDayCrawlerService,
  ) { }

  @Get("/")
  async crawler(
    @Res()
    res: Response
  ) {
    try {
      return res.status(HttpStatus.OK).send({})
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("/aniday")
  async exportAnydayJob(
    @Body() req: {
      jobId: string;
      categoryId: number;
      htmlString: string;
    },
    @Res()
    res: Response
  ) {
    try {
      const jobs = await this.anyDayCrawlerService.exportJobs(req.jobId, req.categoryId, req.htmlString);
      return res.status(HttpStatus.OK).send(jobs)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: JobMessages.CRAWL_ANIDAY })
  async handleGetOneJobMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const rs = await this.anyDayCrawlerService.exportJobs(data.jobId, data.categoryId, data.htmlString);
      return rs
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
