import { ChapterEntity } from '@/entities/chapter.entity';
import { InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { NEST_COMMON } from "@core-api/nest-core";
import { ChaptersService as CoreChaptersService } from "@core-modules/chapters";

const { Injectable } = NEST_COMMON;

@Injectable()
export class ChaptersService extends CoreChaptersService {
  constructor(
    @InjectRepository(ChapterEntity)
    protected chaptersRepository: Repository<ChapterEntity>,
  ) {
    super(chaptersRepository)
  }
}