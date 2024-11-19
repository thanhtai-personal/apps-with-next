import { NEST_COMMON, NEST_MICRO_SERVICE } from '@core-api/nest-core';
import { UMS_SERVICE, RoleMessages } from "@core-api/microservices-utils";
import { CreateRoleDto, IAppCenterRoleFilter, IAppCenterRoleResponse, UpdateRoleDto } from "@core-api/appcenter-materials"
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types"

const { Injectable } = NEST_COMMON;

@Injectable()
export class RolesService {
  constructor(
    @NEST_COMMON.Inject(UMS_SERVICE) private readonly umsClient: NEST_MICRO_SERVICE.ClientProxy,
  ) {
  }

  async findAll(filter: IAppCenterRoleFilter): Promise<INonPagingResponse<IAppCenterRoleResponse>> {
    try {
      const response = await this.umsClient.send({ cmd: RoleMessages.GET_ALL_ROLES }, filter || {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async find(filter: IAppCenterRoleFilter): Promise<IPagingResponse<IAppCenterRoleResponse>> {
    try {
      const response = await this.umsClient.send({ cmd: RoleMessages.GET_ALL_ROLES }, filter || {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async findOne(id: number): Promise<IAppCenterRoleResponse> {
    try {
      const response = await this.umsClient.send({ cmd: RoleMessages.GET_ONE_ROLE }, id).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async update(roleId: number, updateRoleDto: UpdateRoleDto) {
    try {
      const response = await this.umsClient.send({ cmd: RoleMessages.UPDATE_ROLE }, {
        roleId,
        updateRoleDto
      }).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async patchUpdate(roleId: number, updateRoleDto: Partial<UpdateRoleDto>) {
    try {
      const response = await this.umsClient.send({ cmd: RoleMessages.PATCH_UPDATE_ROLE }, {
        roleId,
        updateRoleDto
      }).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }


  async create(requestedRole: CreateRoleDto): Promise<IAppCenterRoleResponse> {
    try {
      const response = await this.umsClient.send({ cmd: RoleMessages.CREATE_ROLE }, requestedRole).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const response = await this.umsClient.send({ cmd: RoleMessages.DELETE_ROLE }, id).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }
}