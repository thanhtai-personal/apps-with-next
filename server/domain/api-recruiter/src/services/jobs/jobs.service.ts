import { JobEntity } from '@/entities/job.entity';
import { InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { NEST_COMMON } from "@core-api/nest-core";
import { JobsService as CoreJobsService } from "@core-modules/jobs";

const { Injectable } = NEST_COMMON;

@Injectable()
export class JobsService extends CoreJobsService {
  constructor(
    @InjectRepository(JobEntity)
    protected jobsRepository: Repository<JobEntity>,
  ) {
    super(jobsRepository)
  }
}