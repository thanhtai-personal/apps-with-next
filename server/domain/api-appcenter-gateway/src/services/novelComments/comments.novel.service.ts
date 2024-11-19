import { NEST_COMMON, NEST_MICRO_SERVICE } from '@core-api/nest-core';
import { UMS_SERVICE, NovelCommentMessages } from "@core-api/microservices-utils";
import { CreateCommentDto, IAppCenterCommentFilter, IAppCenterCommentResponse, UpdateCommentDto } from "@core-api/appcenter-materials"
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types"

const { Injectable } = NEST_COMMON;

@Injectable()
export class NovelCommentsService {
  constructor(
    @NEST_COMMON.Inject(UMS_SERVICE) private readonly umsClient: NEST_MICRO_SERVICE.ClientProxy,
  ) {
  }

  async findAll(filter: IAppCenterCommentFilter): Promise<INonPagingResponse<IAppCenterCommentResponse>> {
    try {
      const response = await this.umsClient.send({ cmd: NovelCommentMessages.GET_ALL_COMMENTS }, filter || {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async find(filter: IAppCenterCommentFilter): Promise<IPagingResponse<IAppCenterCommentResponse>> {
    try {
      const response = await this.umsClient.send({ cmd: NovelCommentMessages.GET_ALL_COMMENTS }, filter || {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async findOne(id: number): Promise<IAppCenterCommentResponse> {
    try {
      const response = await this.umsClient.send({ cmd: NovelCommentMessages.GET_ONE_COMMENT }, id).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async update(commentId: number, updateCommentDto: UpdateCommentDto) {
    try {
      const response = await this.umsClient.send({ cmd: NovelCommentMessages.UPDATE_COMMENT }, {
        commentId,
        updateCommentDto
      }).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async patchUpdate(commentId: number, updateCommentDto: Partial<UpdateCommentDto>) {
    try {
      const response = await this.umsClient.send({ cmd: NovelCommentMessages.PATCH_UPDATE_COMMENT }, {
        commentId,
        updateCommentDto
      }).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }


  async create(requestedComment: CreateCommentDto): Promise<IAppCenterCommentResponse> {
    try {
      const response = await this.umsClient.send({ cmd: NovelCommentMessages.CREATE_COMMENT }, requestedComment).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const response = await this.umsClient.send({ cmd: NovelCommentMessages.DELETE_COMMENT }, id).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }
}