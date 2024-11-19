import { DeepPartial, InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { NEST_COMMON } from '@core-api/nest-core';
import { ISearchQuery, INonPagingResponse, IPagingResponse } from "@core-ui/common-types"
import { PermissionEntityToPermissionResponse } from "../mappers/permission.response.mapper";
import { PermissionEntity } from "../entities";
import { IPermissionResponse } from "../interfaces";
import { IPermissionFilter } from "../interfaces/IPermissionFilter";
import { CreatePermissionDto, UpdatePermissionDto } from "../dtos";
import { PermissionCreateDTOToEntityMapper } from "../mappers/permission.create.mapper";
import { BaseService } from "@core-modules/core";

const { HttpException, HttpStatus, Injectable, NotFoundException } = NEST_COMMON;

@Injectable()
export class PermissionsService extends BaseService {
  constructor(
    @InjectRepository(PermissionEntity)
    protected permissionsRepository: Repository<PermissionEntity>,
  ) {
    super();
  }

  async findAll<T = IPermissionFilter, K = IPermissionResponse>(filter: ISearchQuery<T>): Promise<INonPagingResponse<K>> {
    const permissions = await this.permissionsRepository.find({ where: { deletedAt: undefined }, relations: this.populate });
    return {
      data: PermissionEntityToPermissionResponse.maps(permissions),
    } as INonPagingResponse<K>;
  }

  async find<T = IPermissionFilter, K = IPermissionResponse>(filter: ISearchQuery<T>): Promise<IPagingResponse<K>> {
    const permissions = await this.permissionsRepository.find({ where: { deletedAt: undefined }, relations: this.populate });
    return {
      data: PermissionEntityToPermissionResponse.maps(permissions),
      paging: {
        limit: filter.paging?.limit || 20,
        offset: filter.paging?.offset || 0,
        total: permissions.length,
      }
    } as IPagingResponse<K>;
  }

  async findOne<K = IPermissionResponse>(id: number): Promise<K | null> {
    const permission = await this.permissionsRepository.findOne({ where: { id: id }, relations: this.populate });
    return permission ? PermissionEntityToPermissionResponse.map(permission) as K : null;
  }

  async update<T = UpdatePermissionDto, K = IPermissionResponse>(permissionId: number, updatePermissionDto: T) {
    const permission = await this.permissionsRepository.findOne({
      where: {
        id: permissionId,
      }, relations: this.populate
    });
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    const { id, ...nestedData } = updatePermissionDto as UpdatePermissionDto;
    Object.assign(permission, nestedData);

    const rsPermission = await this.permissionsRepository.save(permission);
    return PermissionEntityToPermissionResponse.map(rsPermission) as K;
  }

  async patchUpdate<T = DeepPartial<UpdatePermissionDto>, K = IPermissionResponse>(permissionId: number, updatePermissionDto: T): Promise<K> {
    const permission = await this.permissionsRepository.findOne({
      where: { id: permissionId }, relations: this.populate,
    });
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    const { id, ...nestedData } = updatePermissionDto as UpdatePermissionDto;
    Object.assign(permission, nestedData);

    const rsPermission = await this.permissionsRepository.save(permission);
    return PermissionEntityToPermissionResponse.map(rsPermission) as K;
  }

  async create<T = CreatePermissionDto, K = IPermissionResponse>(requestedPermission: T): Promise<K> {
    try {
      const permission = this.permissionsRepository.create(PermissionCreateDTOToEntityMapper.map(requestedPermission as CreatePermissionDto));
      await this.permissionsRepository.save(permission);
      return PermissionEntityToPermissionResponse.map(permission) as K;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.permissionsRepository.delete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}