

import { JobsService } from '@/services/jobs/jobs.service';
import { JobsController as CoreJobsController } from "@core-modules/jobs"
import { NEST_COMMON } from "@core-api/nest-core"

const { Controller } = NEST_COMMON

@Controller("/jobs")
export class JobsController extends CoreJobsController {
  constructor(protected readonly jobService: JobsService) {
    super(jobService);
  }
}
