
import { Response } from "express"
import { NEST_COMMON, NEST_MICRO_SERVICE } from "@core-api/nest-core";
import { AuthorsService } from "../services/authors.service";
import { UpdateAuthorDto, CreateAuthorDto } from "../dtos";
import { INonPagingResponse, ISearchQuery, IPagingResponse } from "@core-ui/common-types";
import { IAuthorFilter } from "../interfaces/IAuthorFilter";
import { IAuthorResponse } from "../interfaces";
import { AuthorMessages } from "@core-api/microservices-utils"

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

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: AuthorMessages.GET_ONE_AUTHOR })
  async handleGetOneAuthorMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const author = await this.authorService.findOne(data.authorId);
      return author;
    } catch (error) {
      console.error('Error processing get one author message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Get()
  async getMany(
    @Query() query: ISearchQuery<IAuthorFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<IAuthorResponse> = await this.authorService.find(query) as IPagingResponse<IAuthorResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: AuthorMessages.GET_MANY_AUTHORS })
  async handleGetManyAuthorsMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const authors: IPagingResponse<IAuthorResponse> = await this.authorService.find(data) as IPagingResponse<IAuthorResponse>;
      return authors;
    } catch (error) {
      console.error('Error processing get many authors message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: ISearchQuery<IAuthorFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<IAuthorResponse> = await this.authorService.findAll(query) as INonPagingResponse<IAuthorResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: AuthorMessages.GET_ALL_AUTHORS })
  async handleGetAllAuthorsMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const authors: IPagingResponse<IAuthorResponse> = await this.authorService.find(data) as IPagingResponse<IAuthorResponse>;
      return authors;
    } catch (error) {
      console.error('Error processing get many authors message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Post()
  async createPermisison(
    @Body()
    createPermisisonDto: CreateAuthorDto,
    @Res()
    res: Response
  ) {
    try {
      const author = await this.authorService.create(createPermisisonDto);
      return res.status(HttpStatus.OK).send(author);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: AuthorMessages.CREATE_AUTHOR })
  async handleCreateAuthorMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const authors: IPagingResponse<IAuthorResponse> = await this.authorService.create(data) as IPagingResponse<IAuthorResponse>;
      return authors;
    } catch (error) {
      console.error('Error processing get many authors message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Put("/:authorId")
  async updateAuthor(
    @Param('authorId')
    authorId: number,
    @Body()
    updateAuthorDto: UpdateAuthorDto,
    @Res()
    res: Response
  ) {
    try {
      const author = await this.authorService.update(Number(authorId), updateAuthorDto);
      return res.status(HttpStatus.OK).send(author);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: AuthorMessages.UPDATE_AUTHOR })
  async handleUpdateAuthorMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const author = await this.authorService.update(Number(data.authorId), data.body);
      return author;
    } catch (error) {
      console.error('Error processing get many authors message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Patch("/:authorId")
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

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: AuthorMessages.PATCH_UPDATE_AUTHOR })
  async handlePatchUpdateAuthorMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const author = await this.authorService.patchUpdate(Number(data.authorId), data.body);
      return author;
    } catch (error) {
      console.error('Error processing get many authors message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Delete("/:authorId")
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

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: AuthorMessages.DELETE_AUTHOR })
  async handleDeleteAuthor(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const author = await this.authorService.delete(Number(data));
      return author;
    } catch (error) {
      console.error('Error processing get many authors message', error);
      throw error; // Or handle the error appropriately
    }
  }

}
