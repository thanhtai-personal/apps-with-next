import { NEST_COMMON, NEST_MICRO_SERVICE } from '@core-api/nest-core';
import { UMS_SERVICE, AuthorMessages } from "@core-api/microservices-utils";
import { CreateAuthorDto, IAppCenterAuthorFilter, IAppCenterAuthorResponse, UpdateAuthorDto } from "@core-api/appcenter-materials"
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types"

const { Injectable } = NEST_COMMON;

@Injectable()
export class AuthorsService {
  constructor(
    @NEST_COMMON.Inject(UMS_SERVICE) private readonly umsClient: NEST_MICRO_SERVICE.ClientProxy,
  ) {
  }

  async findAll(filter: IAppCenterAuthorFilter): Promise<INonPagingResponse<IAppCenterAuthorResponse>> {
    try {
      const response = await this.umsClient.send({ cmd: AuthorMessages.GET_ALL_AUTHORS }, filter || {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async find(filter: IAppCenterAuthorFilter): Promise<IPagingResponse<IAppCenterAuthorResponse>> {
    try {
      const response = await this.umsClient.send({ cmd: AuthorMessages.GET_ALL_AUTHORS }, filter || {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async findOne(id: number): Promise<IAppCenterAuthorResponse> {
    try {
      const response = await this.umsClient.send({ cmd: AuthorMessages.GET_ONE_AUTHOR }, id).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async update(authorId: number, updateAuthorDto: UpdateAuthorDto) {
    try {
      const response = await this.umsClient.send({ cmd: AuthorMessages.UPDATE_AUTHOR }, {
        authorId,
        updateAuthorDto
      }).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async patchUpdate(authorId: number, updateAuthorDto: Partial<UpdateAuthorDto>) {
    try {
      const response = await this.umsClient.send({ cmd: AuthorMessages.PATCH_UPDATE_AUTHOR }, {
        authorId,
        updateAuthorDto
      }).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }


  async create(requestedAuthor: CreateAuthorDto): Promise<IAppCenterAuthorResponse> {
    try {
      const response = await this.umsClient.send({ cmd: AuthorMessages.CREATE_AUTHOR }, requestedAuthor).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const response = await this.umsClient.send({ cmd: AuthorMessages.DELETE_AUTHOR }, id).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }
}