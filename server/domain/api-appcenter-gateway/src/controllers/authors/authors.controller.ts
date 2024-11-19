
import { Response } from "express"
import { NEST_COMMON } from "@core-api/nest-core";
import { AuthorsService } from "@/services/authors/authors.service";
import { CreateAuthorDto, IAppCenterAuthorFilter, IAppCenterAuthorResponse, UpdateAuthorDto } from "@core-api/appcenter-materials";
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types"
import { AuthGuard } from "@/guards/auth.guard";

const { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Res, Delete, Post } = NEST_COMMON;

@Controller("/authors")
export class AuthorsController {
  constructor(protected readonly authorService: AuthorsService) { }

  @Get("/:authorId")
  async getOne(
    @Param("authorId")
    authorId: number,
    @Res()
    res: Response
  ) {
    try {
      if (!authorId) throw new HttpException("No author Id", HttpStatus.INTERNAL_SERVER_ERROR);
      const author = await this.authorService.findOne(authorId);
      return res.status(HttpStatus.OK).send(author)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getMany(
    @Query() query: IAppCenterAuthorFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<IAppCenterAuthorResponse> = await this.authorService.find(query);
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: IAppCenterAuthorFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<IAppCenterAuthorResponse> = await this.authorService.findAll(query);
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @NEST_COMMON.UseGuards(AuthGuard)
  async createAuthor(
    @Body()
    createAuthorDto: CreateAuthorDto,
    @Res()
    res: Response
  ) {
    try {
      const author = await this.authorService.create(createAuthorDto);
      return res.status(HttpStatus.OK).send(author);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:authorId")
  @NEST_COMMON.UseGuards(AuthGuard)
  async updateAuthor(
    @Param('authorId')
    authorId: number,
    @Body()
    updateAuthorDto: UpdateAuthorDto,
    @Res()
    res: Response
  ) {
    try {
      const author: IAppCenterAuthorResponse = await this.authorService.update(Number(authorId), updateAuthorDto);
      return res.status(HttpStatus.OK).send(author);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/:authorId")
  @NEST_COMMON.UseGuards(AuthGuard)
  async patchUpdate(
    @Param('authorId')
    authorId: number,
    @Body()
    patchUpdateDto: Partial<UpdateAuthorDto>,
    @Res()
    res: Response
  ) {
    try {
      const author = await this.authorService.patchUpdate(Number(authorId), patchUpdateDto);
      return res.status(HttpStatus.OK).send(author);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete("/:authorId")
  @NEST_COMMON.UseGuards(AuthGuard)
  async delete(
    @Param('authorId')
    authorId: number,
    @Res()
    res: Response
  ) {
    try {
      const author = await this.authorService.delete(Number(authorId));
      return res.status(HttpStatus.OK).send(author);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
