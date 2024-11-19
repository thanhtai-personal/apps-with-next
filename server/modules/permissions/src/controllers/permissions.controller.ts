
import { Response } from "express"
import { NEST_COMMON, NEST_MICRO_SERVICE } from "@core-api/nest-core";
import { PermissionsService } from "../services/permissions.service";
import { UpdatePermissionDto, CreatePermissionDto } from "../dtos";
import { INonPagingResponse, ISearchQuery, IPagingResponse } from "@core-ui/common-types";
import { IPermissionFilter } from "../interfaces/IPermissionFilter";
import { IPermissionResponse } from "../interfaces";
import { PermissionMessages } from "@core-api/microservices-utils"

const { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Res, Delete, Post } = NEST_COMMON;

@Controller("/permissions")
export class PermissionsController {
  constructor(protected readonly permissionService: PermissionsService) { }

  @Get("/:permissionId")
  async getOne(
    @Param("permissionId")
    permissionId: number,
    @Res()
    res: Response
  ) {
    try {
      if (!permissionId) throw new HttpException("No permission Id", HttpStatus.INTERNAL_SERVER_ERROR);
      const permission = await this.permissionService.findOne(permissionId);
      return res.status(HttpStatus.OK).send(permission)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: PermissionMessages.GET_ONE_PERMISSION })
  async handleGetOnePermissionMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const permission = await this.permissionService.findOne(data.permissionId);
      return permission;
    } catch (error) {
      console.error('Error processing get one permission message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Get()
  async getMany(
    @Query() query: ISearchQuery<IPermissionFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<IPermissionResponse> = await this.permissionService.find(query) as IPagingResponse<IPermissionResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: PermissionMessages.GET_MANY_PERMISSIONS })
  async handleGetManyPermissionsMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const permissions: IPagingResponse<IPermissionResponse> = await this.permissionService.find(data) as IPagingResponse<IPermissionResponse>;
      return permissions;
    } catch (error) {
      console.error('Error processing get many permissions message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: ISearchQuery<IPermissionFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<IPermissionResponse> = await this.permissionService.findAll(query) as INonPagingResponse<IPermissionResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: PermissionMessages.GET_ALL_PERMISSIONS })
  async handleGetAllPermissionsMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const permissions: IPagingResponse<IPermissionResponse> = await this.permissionService.find(data) as IPagingResponse<IPermissionResponse>;
      return permissions;
    } catch (error) {
      console.error('Error processing get many permissions message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Post()
  async createPermisison(
    @Body()
    createPermisisonDto: CreatePermissionDto,
    @Res()
    res: Response
  ) {
    try {
      const permission = await this.permissionService.create(createPermisisonDto);
      return res.status(HttpStatus.OK).send(permission);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: PermissionMessages.CREATE_PERMISSION })
  async handleCreatePermissionMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const permissions: IPagingResponse<IPermissionResponse> = await this.permissionService.create(data) as IPagingResponse<IPermissionResponse>;
      return permissions;
    } catch (error) {
      console.error('Error processing get many permissions message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Put("/:permissionId")
  async updatePermission(
    @Param('permissionId')
    permissionId: number,
    @Body()
    updatePermissionDto: UpdatePermissionDto,
    @Res()
    res: Response
  ) {
    try {
      const permission = await this.permissionService.update(Number(permissionId), updatePermissionDto);
      return res.status(HttpStatus.OK).send(permission);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: PermissionMessages.UPDATE_PERMISSION })
  async handleUpdatePermissionMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const permission = await this.permissionService.update(Number(data.permissionId), data.body);
      return permission;
    } catch (error) {
      console.error('Error processing get many permissions message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Patch("/:permissionId")
  async patchUpdate(
    @Param('permissionId')
    permissionId: number,
    @Body()
    patchUpdateDto: Partial<UpdatePermissionDto>,
    @Res()
    res: Response
  ) {
    try {
      const permission = await this.permissionService.patchUpdate(Number(permissionId), patchUpdateDto);
      return res.status(HttpStatus.OK).send(permission);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: PermissionMessages.PATCH_UPDATE_PERMISSION })
  async handlePatchUpdatePermissionMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const permission = await this.permissionService.patchUpdate(Number(data.permissionId), data.body);
      return permission;
    } catch (error) {
      console.error('Error processing get many permissions message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Delete("/:permissionId")
  async delete(
    @Param('permissionId')
    permissionId: number,
    @Res()
    res: Response
  ) {
    try {
      const permission = await this.permissionService.delete(Number(permissionId));
      return res.status(HttpStatus.OK).send(permission);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: PermissionMessages.DELETE_PERMISSION })
  async handleDeletePermission(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const permission = await this.permissionService.delete(Number(data));
      return permission;
    } catch (error) {
      console.error('Error processing get many permissions message', error);
      throw error; // Or handle the error appropriately
    }
  }

}
