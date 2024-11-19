import { DeepPartial, InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { NEST_COMMON } from '@core-api/nest-core';
import { ISearchQuery, INonPagingResponse, IPagingResponse } from "@core-ui/common-types"
import { RoleEntityToRoleResponse } from "../mappers/role.response.mapper";
import { RoleEntity } from "../entities";
import { IRoleResponse } from "../interfaces";
import { IRoleFilter } from "../interfaces/IRoleFilter";
import { CreateRoleDto, UpdateRoleDto } from "../dtos";
import { RoleCreateDTOToEntityMapper } from "../mappers/role.create.mapper";
import { BaseService } from "@core-modules/core";

const { HttpException, HttpStatus, Injectable, NotFoundException } = NEST_COMMON;

@Injectable()
export class RolesService extends BaseService {
  constructor(
    @InjectRepository(RoleEntity)
    protected rolesRepository: Repository<RoleEntity>,
  ) {
    super();
  }

  async findAll<T = IRoleFilter, K = IRoleResponse>(filter: ISearchQuery<T>): Promise<INonPagingResponse<K>> {
    const roles = await this.rolesRepository.find({ where: { deletedAt: undefined }, relations: this.populate });
    return {
      data: RoleEntityToRoleResponse.maps(roles),
    } as INonPagingResponse<K>;
  }

  async find<T = IRoleFilter, K = IRoleResponse>(filter: ISearchQuery<T>): Promise<IPagingResponse<K>> {
    const roles = await this.rolesRepository.find({ where: { deletedAt: undefined }, relations: this.populate });
    return {
      data: RoleEntityToRoleResponse.maps(roles),
      paging: {
        limit: filter.paging?.limit || 20,
        offset: filter.paging?.offset || 0,
        total: roles.length,
      }
    } as IPagingResponse<K>;
  }

  async findOne<K = IRoleResponse>(id: number): Promise<K | null> {
    const role = await this.rolesRepository.findOne({ where: { id: id }, relations: this.populate });
    return role ? RoleEntityToRoleResponse.map(role) as K : null;
  }

  async update<T = UpdateRoleDto, K = IRoleResponse>(roleId: number, updateRoleDto: T) {
    const role = await this.rolesRepository.findOne({
      where: {
        id: roleId,
      }, relations: this.populate
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    const { id, ...nestedData } = updateRoleDto as UpdateRoleDto;
    Object.assign(role, nestedData);

    const rsRole = await this.rolesRepository.save(role);
    return RoleEntityToRoleResponse.map(rsRole) as K;
  }

  async patchUpdate<T = DeepPartial<UpdateRoleDto>, K = IRoleResponse>(roleId: number, updateRoleDto: T): Promise<K> {
    const role = await this.rolesRepository.findOne({
      where: { id: roleId }, relations: this.populate,
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    const { id, ...nestedData } = updateRoleDto as UpdateRoleDto;
    Object.assign(role, nestedData);

    const rsRole = await this.rolesRepository.save(role);
    return RoleEntityToRoleResponse.map(rsRole) as K;
  }

  async create<T = CreateRoleDto, K = IRoleResponse>(requestedRole: T): Promise<K> {
    try {
      const role = this.rolesRepository.create(RoleCreateDTOToEntityMapper.map(requestedRole as CreateRoleDto));
      await this.rolesRepository.save(role);
      return RoleEntityToRoleResponse.map(role) as K;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.rolesRepository.delete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}