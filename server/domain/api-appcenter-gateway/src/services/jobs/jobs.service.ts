import { NEST_COMMON, NEST_MICRO_SERVICE } from '@core-api/nest-core';
import { RECRUITER_SERVICE, JobMessages } from "@core-api/microservices-utils";
import { CreateJobDto, IAppCenterJobFilter, IAppCenterJobResponse, UpdateJobDto } from "@core-api/appcenter-materials"
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types"

const { Injectable } = NEST_COMMON;

@Injectable()
export class JobsService {
  constructor(
    @NEST_COMMON.Inject(RECRUITER_SERVICE) private readonly recruiterClient: NEST_MICRO_SERVICE.ClientProxy,
  ) {
  }

  async findAll(filter: IAppCenterJobFilter): Promise<INonPagingResponse<IAppCenterJobResponse>> {
    try {
      const response = await this.recruiterClient.send({ cmd: JobMessages.GET_ALL_JOBS }, filter || {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async find(filter: IAppCenterJobFilter): Promise<IPagingResponse<IAppCenterJobResponse>> {
    try {
      const response = await this.recruiterClient.send({ cmd: JobMessages.GET_ALL_JOBS }, filter || {}).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async findOne(id: number): Promise<IAppCenterJobResponse> {
    try {
      const response = await this.recruiterClient.send({ cmd: JobMessages.GET_ONE_JOB }, id).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async update(jobId: number, updateJobDto: UpdateJobDto) {
    try {
      const response = await this.recruiterClient.send({ cmd: JobMessages.UPDATE_JOB }, {
        jobId,
        updateJobDto
      }).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async patchUpdate(jobId: number, updateJobDto: Partial<UpdateJobDto>) {
    try {
      const response = await this.recruiterClient.send({ cmd: JobMessages.PATCH_UPDATE_JOB }, {
        jobId,
        updateJobDto
      }).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }


  async create(requestedJob: CreateJobDto): Promise<IAppCenterJobResponse> {
    try {
      const response = await this.recruiterClient.send({ cmd: JobMessages.CREATE_JOB }, requestedJob).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const response = await this.recruiterClient.send({ cmd: JobMessages.DELETE_JOB }, id).toPromise();
      return response
    } catch (error) {
      throw new NEST_COMMON.UnauthorizedException();
    }
  }
}