
import { Response } from "express"
import { NEST_COMMON } from "@core-api/nest-core";
import { CrawlerService } from "@/services/crawler/crawler.service";

const { Body, Controller, HttpException, HttpStatus, Res, Post } = NEST_COMMON;

@Controller("/crawler")
export class CrawlerController {
  constructor(protected readonly crawlerService: CrawlerService) { }

  @Post("/anidays")
  async addJob(
    @Body()
    body: {
      jobId: string | number,
      categoryId: string | number,
      htmlString: string
    },
    @Res()
    res: Response
  ) {
    try {
      const rs = await this.crawlerService.addJobFromAniday(body);
      return res.status(HttpStatus.OK).send(rs)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("/tangthuvien")
  async crawlTTVNovels(
    @Res()
    res: Response
  ) {
    try {
      const rs = await this.crawlerService.crawlTTV();
      return res.status(HttpStatus.OK).send(rs)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
