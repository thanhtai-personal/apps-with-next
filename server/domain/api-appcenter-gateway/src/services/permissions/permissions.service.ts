import { NEST_COMMON, NEST_MICRO_SERVICE } from '@core-api/nest-core';
import { UMS_SERVICE, PermissionMessages } from "@core-api/microservices-utils";
import { CreatePermissionDto, IAppCenterPermissionFilter, IAppCenterPermissionResponse, UpdatePermissionDto } from "@core-api/appcenter-materials"
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types"

const { Injectable } = NEST_COMMON;

@Injectable()
export class PermissionsService {
  constructor(
    @NEST_COMMON.Inject(UMS_SERVICE) private readonly umsClient: NEST_MICRO_SERVICE.ClientProxy,
  ) {
  }

  async findAll(filter: IAppCenterPermissionFilter): Promise<INonPagingResponse<IAppCenterPermissionResponse>> {
    try {
      const response = await this.umsClient.send({ cmd: PermissionMessages.GET_ALL_PERMISSIONS }, filter || {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async find(filter: IAppCenterPermissionFilter): Promise<IPagingResponse<IAppCenterPermissionResponse>> {
    try {
      const response = await this.umsClient.send({ cmd: PermissionMessages.GET_ALL_PERMISSIONS }, filter || {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async findOne(id: number): Promise<IAppCenterPermissionResponse> {
    try {
      const response = await this.umsClient.send({ cmd: PermissionMessages.GET_ONE_PERMISSION }, id).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async update(permissionId: number, updatePermissionDto: UpdatePermissionDto) {
    try {
      const response = await this.umsClient.send({ cmd: PermissionMessages.UPDATE_PERMISSION }, {
        permissionId,
        updatePermissionDto
      }).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async patchUpdate(permissionId: number, updatePermissionDto: Partial<UpdatePermissionDto>) {
    try {
      const response = await this.umsClient.send({ cmd: PermissionMessages.PATCH_UPDATE_PERMISSION }, {
        permissionId,
        updatePermissionDto
      }).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }


  async create(requestedPermission: CreatePermissionDto): Promise<IAppCenterPermissionResponse> {
    try {
      const response = await this.umsClient.send({ cmd: PermissionMessages.CREATE_PERMISSION }, requestedPermission).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const response = await this.umsClient.send({ cmd: PermissionMessages.DELETE_PERMISSION }, id).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }
}