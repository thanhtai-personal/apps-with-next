
import { Response } from "express"
import { NEST_COMMON, NEST_MICRO_SERVICE } from "@core-api/nest-core";
import { JobsService } from "../services/jobs.service";
import { UpdateJobDto, CreateJobDto } from "../dtos";
import { INonPagingResponse, ISearchQuery, IPagingResponse } from "@core-ui/common-types";
import { IJobFilter } from "../interfaces/IJobFilter";
import { IJobResponse } from "../interfaces";
import { JobMessages } from "@core-api/microservices-utils"

const { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Put, Query, Res, Delete, Post } = NEST_COMMON;

@Controller("/jobs")
export class JobsController {
  constructor(protected readonly jobService: JobsService) { }

  @Get("/:jobId")
  async getOne(
    @Param("jobId")
    jobId: number,
    @Res()
    res: Response
  ) {
    try {
      if (!jobId) throw new HttpException("No job Id", HttpStatus.INTERNAL_SERVER_ERROR);
      const job = await this.jobService.findOne(jobId);
      return res.status(HttpStatus.OK).send(job)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: JobMessages.GET_ONE_JOB })
  async handleGetOneJobMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const job = await this.jobService.findOne(data.jobId);
      return job;
    } catch (error) {
      console.error('Error processing get one job message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Get()
  async getMany(
    @Query() query: ISearchQuery<IJobFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<IJobResponse> = await this.jobService.find(query) as IPagingResponse<IJobResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: JobMessages.GET_MANY_JOBS })
  async handleGetManyJobsMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const jobs: IPagingResponse<IJobResponse> = await this.jobService.find(data) as IPagingResponse<IJobResponse>;
      return jobs;
    } catch (error) {
      console.error('Error processing get many jobs message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: ISearchQuery<IJobFilter>,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<IJobResponse> = await this.jobService.findAll(query) as INonPagingResponse<IJobResponse>;
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: JobMessages.GET_ALL_JOBS })
  async handleGetAllJobsMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const jobs: IPagingResponse<IJobResponse> = await this.jobService.find(data) as IPagingResponse<IJobResponse>;
      return jobs;
    } catch (error) {
      console.error('Error processing get many jobs message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Post()
  async createPermisison(
    @Body()
    createPermisisonDto: CreateJobDto,
    @Res()
    res: Response
  ) {
    try {
      const job = await this.jobService.create(createPermisisonDto);
      return res.status(HttpStatus.OK).send(job);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: JobMessages.CREATE_JOB })
  async handleCreateJobMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const jobs: IPagingResponse<IJobResponse> = await this.jobService.create(data) as IPagingResponse<IJobResponse>;
      return jobs;
    } catch (error) {
      console.error('Error processing get many jobs message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Put("/:jobId")
  async updateJob(
    @Param('jobId')
    jobId: number,
    @Body()
    updateJobDto: UpdateJobDto,
    @Res()
    res: Response
  ) {
    try {
      const job = await this.jobService.update(Number(jobId), updateJobDto);
      return res.status(HttpStatus.OK).send(job);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: JobMessages.UPDATE_JOB })
  async handleUpdateJobMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const job = await this.jobService.update(Number(data.jobId), data.body);
      return job;
    } catch (error) {
      console.error('Error processing get many jobs message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Patch("/:jobId")
  async patchUpdate(
    @Param('jobId')
    jobId: number,
    @Body()
    patchUpdateDto: Partial<UpdateJobDto>,
    @Res()
    res: Response
  ) {
    try {
      const job = await this.jobService.patchUpdate(Number(jobId), patchUpdateDto);
      return res.status(HttpStatus.OK).send(job);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: JobMessages.PATCH_UPDATE_JOB })
  async handlePatchUpdateJobMessage(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const job = await this.jobService.patchUpdate(Number(data.jobId), data.body);
      return job;
    } catch (error) {
      console.error('Error processing get many jobs message', error);
      throw error; // Or handle the error appropriately
    }
  }

  @Delete("/:jobId")
  async delete(
    @Param('jobId')
    jobId: number,
    @Res()
    res: Response
  ) {
    try {
      const job = await this.jobService.delete(Number(jobId));
      return res.status(HttpStatus.OK).send(job);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @NEST_MICRO_SERVICE.MessagePattern({ cmd: JobMessages.DELETE_JOB })
  async handleDeleteJob(@NEST_MICRO_SERVICE.Payload() data: any, @NEST_MICRO_SERVICE.Ctx() context: NEST_MICRO_SERVICE.RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    try {
      const job = await this.jobService.delete(Number(data));
      return job;
    } catch (error) {
      console.error('Error processing get many jobs message', error);
      throw error; // Or handle the error appropriately
    }
  }

}
