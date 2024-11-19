import { NEST_COMMON, NEST_MICRO_SERVICE } from '@core-api/nest-core';
import { UMS_SERVICE, UserMessages } from "@core-api/microservices-utils";
import { CreateUserDto, IAppCenterUserFilter, IAppCenterUserResponse, UpdateUserDto } from "@core-api/appcenter-materials"
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types"

const { Injectable } = NEST_COMMON;

@Injectable()
export class UsersService {
  constructor(
    @NEST_COMMON.Inject(UMS_SERVICE) private readonly umsClient: NEST_MICRO_SERVICE.ClientProxy,
  ) {
  }

  async findAll(filter: IAppCenterUserFilter): Promise<INonPagingResponse<IAppCenterUserResponse>> {
    try {
      const response = await this.umsClient.send({ cmd: UserMessages.GET_ALL_USERS }, filter || {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async find(filter: IAppCenterUserFilter): Promise<IPagingResponse<IAppCenterUserResponse>> {
    try {
      const response = await this.umsClient.send({ cmd: UserMessages.GET_ALL_USERS }, filter || {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async findOne(id: number): Promise<IAppCenterUserResponse> {
    try {
      const response = await this.umsClient.send({ cmd: UserMessages.GET_ONE_USER }, id).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    try {
      const response = await this.umsClient.send({ cmd: UserMessages.UPDATE_USER }, {
        userId,
        updateUserDto
      }).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async patchUpdate(userId: number, updateUserDto: Partial<UpdateUserDto>) {
    try {
      const response = await this.umsClient.send({ cmd: UserMessages.PATCH_UPDATE_USER }, {
        userId,
        updateUserDto
      }).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }


  async create(requestedUser: CreateUserDto): Promise<IAppCenterUserResponse> {
    try {
      const response = await this.umsClient.send({ cmd: UserMessages.CREATE_USER }, requestedUser).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const response = await this.umsClient.send({ cmd: UserMessages.DELETE_USER }, id).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }
}