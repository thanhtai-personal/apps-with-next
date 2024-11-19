import { NovelsService } from '@/services/novels/novels.service';
import { NovelsController as CoreNovelsController } from "@core-modules/novels"
import { NEST_COMMON } from "@core-api/nest-core"

const { Controller } = NEST_COMMON

@Controller("/novels")
export class NovelsController extends CoreNovelsController {
  constructor(protected readonly novelService: NovelsService) {
    super(novelService);
  }
}
