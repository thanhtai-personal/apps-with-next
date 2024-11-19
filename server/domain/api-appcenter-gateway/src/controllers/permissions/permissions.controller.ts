
import { Response } from "express"
import { NEST_COMMON } from "@core-api/nest-core";
import { PermissionsService } from "@/services/permissions/permissions.service";
import { CreatePermissionDto, IAppCenterPermissionFilter, IAppCenterPermissionResponse, UpdatePermissionDto } from "@core-api/appcenter-materials";
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types"
import { AuthGuard } from "@/guards/auth.guard";

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

  @Get()
  async getMany(
    @Query() query: IAppCenterPermissionFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<IAppCenterPermissionResponse> = await this.permissionService.find(query);
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: IAppCenterPermissionFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<IAppCenterPermissionResponse> = await this.permissionService.findAll(query);
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @NEST_COMMON.UseGuards(AuthGuard)
  async createPermission(
    @Body()
    createPermissionDto: CreatePermissionDto,
    @Res()
    res: Response
  ) {
    try {
      const permission = await this.permissionService.create(createPermissionDto);
      return res.status(HttpStatus.OK).send(permission);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:permissionId")
  @NEST_COMMON.UseGuards(AuthGuard)
  async updatePermission(
    @Param('permissionId')
    permissionId: number,
    @Body()
    updatePermissionDto: UpdatePermissionDto,
    @Res()
    res: Response
  ) {
    try {
      const permission: IAppCenterPermissionResponse = await this.permissionService.update(Number(permissionId), updatePermissionDto);
      return res.status(HttpStatus.OK).send(permission);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/:permissionId")
  @NEST_COMMON.UseGuards(AuthGuard)
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

  @Delete("/:permissionId")
  @NEST_COMMON.UseGuards(AuthGuard)
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
}
