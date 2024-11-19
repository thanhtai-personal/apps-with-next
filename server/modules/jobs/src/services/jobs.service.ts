import { DeepPartial, InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { NEST_COMMON } from '@core-api/nest-core';
import { ISearchQuery, INonPagingResponse, IPagingResponse } from "@core-ui/common-types"
import { JobEntityToJobResponse } from "../mappers/job.response.mapper";
import { JobEntity } from "../entities";
import { IJobResponse } from "../interfaces";
import { IJobFilter } from "../interfaces/IJobFilter";
import { CreateJobDto, UpdateJobDto } from "../dtos";
import { JobCreateDTOToEntityMapper } from "../mappers/job.create.mapper";
import { BaseService } from "@core-modules/core";

const { HttpException, HttpStatus, Injectable, NotFoundException } = NEST_COMMON;

@Injectable()
export class JobsService extends BaseService {
  constructor(
    @InjectRepository(JobEntity)
    protected jobsRepository: Repository<JobEntity>,
  ) {
    super();
  }

  async findAll<T = IJobFilter, K = IJobResponse>(filter: ISearchQuery<T>): Promise<INonPagingResponse<K>> {
    const jobs = await this.jobsRepository.find({ where: { deletedAt: undefined }, relations: this.populate });
    return {
      data: JobEntityToJobResponse.maps(jobs),
    } as INonPagingResponse<K>;
  }

  async find<T = IJobFilter, K = IJobResponse>(filter: ISearchQuery<T>): Promise<IPagingResponse<K>> {
    const jobs = await this.jobsRepository.find({ where: { deletedAt: undefined }, relations: this.populate });
    return {
      data: JobEntityToJobResponse.maps(jobs),
      paging: {
        limit: filter.paging?.limit || 20,
        offset: filter.paging?.offset || 0,
        total: jobs.length,
      }
    } as IPagingResponse<K>;
  }

  async findOne<K = IJobResponse>(id: number): Promise<K | null> {
    const job = await this.jobsRepository.findOne({ where: { id: id }, relations: this.populate });
    return job ? JobEntityToJobResponse.map(job) as K : null;
  }

  async update<T = UpdateJobDto, K = IJobResponse>(jobId: number, updateJobDto: T) {
    const job = await this.jobsRepository.findOne({
      where: {
        id: jobId,
      }, relations: this.populate
    });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    const { id, ...nestedData } = updateJobDto as UpdateJobDto;
    Object.assign(job, nestedData);

    const rsJob = await this.jobsRepository.save(job);
    return JobEntityToJobResponse.map(rsJob) as K;
  }

  async patchUpdate<T = DeepPartial<UpdateJobDto>, K = IJobResponse>(jobId: number, updateJobDto: T): Promise<K> {
    const job = await this.jobsRepository.findOne({
      where: { id: jobId }, relations: this.populate,
    });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    const { id, ...nestedData } = updateJobDto as UpdateJobDto;
    Object.assign(job, nestedData);

    const rsJob = await this.jobsRepository.save(job);
    return JobEntityToJobResponse.map(rsJob) as K;
  }

  async create<T = CreateJobDto, K = IJobResponse>(requestedJob: T): Promise<K> {
    try {
      const job = this.jobsRepository.create(JobCreateDTOToEntityMapper.map(requestedJob as CreateJobDto));
      await this.jobsRepository.save(job);
      return JobEntityToJobResponse.map(job) as K;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.jobsRepository.delete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}