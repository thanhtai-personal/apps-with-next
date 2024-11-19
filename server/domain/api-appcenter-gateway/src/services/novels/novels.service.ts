import { NEST_COMMON, NEST_MICRO_SERVICE } from '@core-api/nest-core';
import { UMS_SERVICE, NovelMessages } from "@core-api/microservices-utils";
import { CreateNovelDto, IAppCenterNovelFilter, IAppCenterNovelResponse, UpdateNovelDto } from "@core-api/appcenter-materials"
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types"

const { Injectable } = NEST_COMMON;

@Injectable()
export class NovelsService {
  constructor(
    @NEST_COMMON.Inject(UMS_SERVICE) private readonly umsClient: NEST_MICRO_SERVICE.ClientProxy,
  ) {
  }

  async findAll(filter: IAppCenterNovelFilter): Promise<INonPagingResponse<IAppCenterNovelResponse>> {
    try {
      const response = await this.umsClient.send({ cmd: NovelMessages.GET_ALL_NOVELS }, filter || {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async find(filter: IAppCenterNovelFilter): Promise<IPagingResponse<IAppCenterNovelResponse>> {
    try {
      const response = await this.umsClient.send({ cmd: NovelMessages.GET_ALL_NOVELS }, filter || {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async findOne(id: number): Promise<IAppCenterNovelResponse> {
    try {
      const response = await this.umsClient.send({ cmd: NovelMessages.GET_ONE_NOVEL }, id).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async update(novelId: number, updateNovelDto: UpdateNovelDto) {
    try {
      const response = await this.umsClient.send({ cmd: NovelMessages.UPDATE_NOVEL }, {
        novelId,
        updateNovelDto
      }).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async patchUpdate(novelId: number, updateNovelDto: Partial<UpdateNovelDto>) {
    try {
      const response = await this.umsClient.send({ cmd: NovelMessages.PATCH_UPDATE_NOVEL }, {
        novelId,
        updateNovelDto
      }).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }


  async create(requestedNovel: CreateNovelDto): Promise<IAppCenterNovelResponse> {
    try {
      const response = await this.umsClient.send({ cmd: NovelMessages.CREATE_NOVEL }, requestedNovel).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const response = await this.umsClient.send({ cmd: NovelMessages.DELETE_NOVEL }, id).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }
}