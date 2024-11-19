import { NEST_COMMON, NEST_MICRO_SERVICE } from '@core-api/nest-core';
import { NOVEL_SERVICE, RECRUITER_SERVICE, JobMessages, NovelMessages } from "@core-api/microservices-utils";

const { Injectable } = NEST_COMMON;

@Injectable()
export class CrawlerService {
  constructor(
    @NEST_COMMON.Inject(RECRUITER_SERVICE) private readonly recruiterClient: NEST_MICRO_SERVICE.ClientProxy,
    @NEST_COMMON.Inject(NOVEL_SERVICE) private readonly novelsClient: NEST_MICRO_SERVICE.ClientProxy,
  ) {
  }
  async addJobFromAniday(requestedJob: any): Promise<any> {
    try {
      const response = await this.recruiterClient.send({ cmd: JobMessages.CRAWL_ANIDAY }, requestedJob).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }
  
  async crawlTTV(): Promise<any> {
    try {
      const response = await this.novelsClient.send({ cmd: NovelMessages.CRAWL_TTV }, {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }
}