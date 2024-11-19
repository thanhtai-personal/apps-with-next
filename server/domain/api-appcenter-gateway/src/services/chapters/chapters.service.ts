import { NEST_COMMON, NEST_MICRO_SERVICE } from '@core-api/nest-core';
import { UMS_SERVICE, ChapterMessages } from "@core-api/microservices-utils";
import { CreateChapterDto, IAppCenterChapterFilter, IAppCenterChapterResponse, UpdateChapterDto } from "@core-api/appcenter-materials"
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types"

const { Injectable } = NEST_COMMON;

@Injectable()
export class ChaptersService {
  constructor(
    @NEST_COMMON.Inject(UMS_SERVICE) private readonly umsClient: NEST_MICRO_SERVICE.ClientProxy,
  ) {
  }

  async findAll(filter: IAppCenterChapterFilter): Promise<INonPagingResponse<IAppCenterChapterResponse>> {
    try {
      const response = await this.umsClient.send({ cmd: ChapterMessages.GET_ALL_CHAPTERS }, filter || {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async find(filter: IAppCenterChapterFilter): Promise<IPagingResponse<IAppCenterChapterResponse>> {
    try {
      const response = await this.umsClient.send({ cmd: ChapterMessages.GET_ALL_CHAPTERS }, filter || {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async findOne(id: number): Promise<IAppCenterChapterResponse> {
    try {
      const response = await this.umsClient.send({ cmd: ChapterMessages.GET_ONE_CHAPTER }, id).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async update(chapterId: number, updateChapterDto: UpdateChapterDto) {
    try {
      const response = await this.umsClient.send({ cmd: ChapterMessages.UPDATE_CHAPTER }, {
        chapterId,
        updateChapterDto
      }).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async patchUpdate(chapterId: number, updateChapterDto: Partial<UpdateChapterDto>) {
    try {
      const response = await this.umsClient.send({ cmd: ChapterMessages.PATCH_UPDATE_CHAPTER }, {
        chapterId,
        updateChapterDto
      }).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }


  async create(requestedChapter: CreateChapterDto): Promise<IAppCenterChapterResponse> {
    try {
      const response = await this.umsClient.send({ cmd: ChapterMessages.CREATE_CHAPTER }, requestedChapter).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const response = await this.umsClient.send({ cmd: ChapterMessages.DELETE_CHAPTER }, id).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }
}