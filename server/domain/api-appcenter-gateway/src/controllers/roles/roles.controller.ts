
import { Response } from "express"
import { NEST_COMMON } from "@core-api/nest-core";
import { RolesService } from "@/services/roles/roles.service";
import { CreateRoleDto, IAppCenterRoleFilter, IAppCenterRoleResponse, UpdateRoleDto } from "@core-api/appcenter-materials";
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types"
import { AuthGuard } from "@/guards/auth.guard";

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

  @Get()
  async getMany(
    @Query() query: IAppCenterRoleFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<IAppCenterRoleResponse> = await this.roleService.find(query);
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: IAppCenterRoleFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<IAppCenterRoleResponse> = await this.roleService.findAll(query);
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @NEST_COMMON.UseGuards(AuthGuard)
  async createRole(
    @Body()
    createRoleDto: CreateRoleDto,
    @Res()
    res: Response
  ) {
    try {
      const role = await this.roleService.create(createRoleDto);
      return res.status(HttpStatus.OK).send(role);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:roleId")
  @NEST_COMMON.UseGuards(AuthGuard)
  async updateRole(
    @Param('roleId')
    roleId: number,
    @Body()
    updateRoleDto: UpdateRoleDto,
    @Res()
    res: Response
  ) {
    try {
      const role: IAppCenterRoleResponse = await this.roleService.update(Number(roleId), updateRoleDto);
      return res.status(HttpStatus.OK).send(role);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/:roleId")
  @NEST_COMMON.UseGuards(AuthGuard)
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

  @Delete("/:roleId")
  @NEST_COMMON.UseGuards(AuthGuard)
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
}
