

import { TTVCrawlerService } from '@/services/ttvCrawler/ttvCrawler.service';
import { NEST_COMMON } from "@core-api/nest-core";
import { Response } from "express"

const {  Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res, UseGuards } = NEST_COMMON

@Controller("/crawler")
export class CrawlerController {
  constructor(
    private readonly ttvCrawlerService: TTVCrawlerService,
  ) { }

  @Get("/tangthuvien")
  async crawnTangThuVien(
    @Param("isUpdateOnly") isUpdateOnly: boolean,
    @Res()
    res: Response
  ) {
    try {
      this.ttvCrawlerService.crawlTTV(!isUpdateOnly);
      return res.status(HttpStatus.OK).send(true)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/")
  async crawnAll(
    @Res()
    res: Response
  ) {
    try {
      await this.ttvCrawlerService.crawlData();
      return res.status(HttpStatus.OK).send(true)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
