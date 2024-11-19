import { ChaptersService } from '@/services/chapters/chapters.service';
import { ChaptersController as CoreChaptersController } from "@core-modules/chapters"
import { NEST_COMMON } from "@core-api/nest-core"

const { Controller } = NEST_COMMON

@Controller("/chapters")
export class ChaptersController extends CoreChaptersController {
  constructor(protected readonly chapterService: ChaptersService) {
    super(chapterService);
  }
}
