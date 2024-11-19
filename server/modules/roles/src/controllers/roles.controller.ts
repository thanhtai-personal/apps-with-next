
import { Response } from "express"
import { NEST_COMMON, NEST_MICRO_SERVICE } from "@core-api/nest-core";
import { RolesService } from "../services/roles.service";
import { UpdateRoleDto, CreateRoleDto } from "../dtos";
import { INonPagingResponse, ISearchQuery, IPagingResponse } from "@core-ui/common-types";
import { IRoleFilter } from "../interfaces/IRoleFilter";
import { IRoleResponse } from "../interfaces";
import { RoleMessages } from "@core-api/microservices-utils"

const { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Res, Delete, Post } = NEST_COMMON;

@Controller("/roles")
export class RolesController {
  constructor(protected readonly roleService: RolesService) { }

  @Get("/:roleId")
  async getOne(
    @Param("roleId")
    roleId: number,
    @Res()
    res: Response
  ) {
    try {
      if (!roleId) throw new HttpException("No role Id", HttpStatus.INTERNAL_SERVER_ERROR);
      const role = await this.roleService.findOne(roleId);
      return res.status(HttpStatus.OK).send(role)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: RoleMessages.GET_ONE_ROLE })
  async handleGetOneRoleMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const role = await this.roleService.findOne(data.roleId);
      return role;
    } catch (error) {
      console.error('Error processing get one role message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Get()
  async getMany(
    @Query() query: ISearchQuery<IRoleFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<IRoleResponse> = await this.roleService.find(query) as IPagingResponse<IRoleResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: RoleMessages.GET_MANY_ROLES })
  async handleGetManyRolesMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const roles: IPagingResponse<IRoleResponse> = await this.roleService.find(data) as IPagingResponse<IRoleResponse>;
      return roles;
    } catch (error) {
      console.error('Error processing get many roles message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: ISearchQuery<IRoleFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<IRoleResponse> = await this.roleService.findAll(query) as INonPagingResponse<IRoleResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: RoleMessages.GET_ALL_ROLES })
  async handleGetAllRolesMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const roles: IPagingResponse<IRoleResponse> = await this.roleService.find(data) as IPagingResponse<IRoleResponse>;
      return roles;
    } catch (error) {
      console.error('Error processing get many roles message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Post()
  async createPermisison(
    @Body()
    createPermisisonDto: CreateRoleDto,
    @Res()
    res: Response
  ) {
    try {
      const role = await this.roleService.create(createPermisisonDto);
      return res.status(HttpStatus.OK).send(role);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: RoleMessages.CREATE_ROLE })
  async handleCreateRoleMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const roles: IPagingResponse<IRoleResponse> = await this.roleService.create(data) as IPagingResponse<IRoleResponse>;
      return roles;
    } catch (error) {
      console.error('Error processing get many roles message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Put("/:roleId")
  async updateRole(
    @Param('roleId')
    roleId: number,
    @Body()
    updateRoleDto: UpdateRoleDto,
    @Res()
    res: Response
  ) {
    try {
      const role = await this.roleService.update(Number(roleId), updateRoleDto);
      return res.status(HttpStatus.OK).send(role);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: RoleMessages.UPDATE_ROLE })
  async handleUpdateRoleMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const role = await this.roleService.update(Number(data.roleId), data.body);
      return role;
    } catch (error) {
      console.error('Error processing get many roles message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Patch("/:roleId")
  async patchUpdate(
    @Param('roleId')
    roleId: number,
    @Body()
    patchUpdateDto: Partial<UpdateRoleDto>,
    @Res()
    res: Response
  ) {
    try {
      const role = await this.roleService.patchUpdate(Number(roleId), patchUpdateDto);
      return res.status(HttpStatus.OK).send(role);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: RoleMessages.PATCH_UPDATE_ROLE })
  async handlePatchUpdateRoleMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const role = await this.roleService.patchUpdate(Number(data.roleId), data.body);
      return role;
    } catch (error) {
      console.error('Error processing get many roles message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Delete("/:roleId")
  async delete(
    @Param('roleId')
    roleId: number,
    @Res()
    res: Response
  ) {
    try {
      const role = await this.roleService.delete(Number(roleId));
      return res.status(HttpStatus.OK).send(role);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: RoleMessages.DELETE_ROLE })
  async handleDeleteRole(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const role = await this.roleService.delete(Number(data));
      return role;
    } catch (error) {
      console.error('Error processing get many roles message', error);
      throw error; // Or handle the error appropriately
    }
  }

}
