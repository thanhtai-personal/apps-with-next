
import { Response } from "express"
import { NEST_COMMON } from "@core-api/nest-core";
import { JobsService } from "@/services/jobs/jobs.service";
import { CreateJobDto, IAppCenterJobFilter, IAppCenterJobResponse, UpdateJobDto } from "@core-api/appcenter-materials";
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types"
import { AuthGuard } from "@/guards/auth.guard";

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

  @Get()
  async getMany(
    @Query() query: IAppCenterJobFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: IPagingResponse<IAppCenterJobResponse> = await this.jobService.find(query);
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/all")
  async getAll(
    @Query() query: IAppCenterJobFilter,
    @Res()
    res: Response
  ) {
    try {
      const data: INonPagingResponse<IAppCenterJobResponse> = await this.jobService.findAll(query);
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @NEST_COMMON.UseGuards(AuthGuard)
  async createJob(
    @Body()
    createJobDto: CreateJobDto,
    @Res()
    res: Response
  ) {
    try {
      const job = await this.jobService.create(createJobDto);
      return res.status(HttpStatus.OK).send(job);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:jobId")
  @NEST_COMMON.UseGuards(AuthGuard)
  async updateJob(
    @Param('jobId')
    jobId: number,
    @Body()
    updateJobDto: UpdateJobDto,
    @Res()
    res: Response
  ) {
    try {
      const job: IAppCenterJobResponse = await this.jobService.update(Number(jobId), updateJobDto);
      return res.status(HttpStatus.OK).send(job);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/:jobId")
  @NEST_COMMON.UseGuards(AuthGuard)
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

  @Delete("/:jobId")
  @NEST_COMMON.UseGuards(AuthGuard)
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
}
