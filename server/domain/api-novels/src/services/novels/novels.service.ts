import { NovelEntity } from '@/entities/novel.entity';
import { InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { NEST_COMMON } from "@core-api/nest-core";
import { NovelsService as CoreNovelsService } from "@core-modules/novels";

const { Injectable } = NEST_COMMON;

@Injectable()
export class NovelsService extends CoreNovelsService {
  constructor(
    @InjectRepository(NovelEntity)
    protected novelsRepository: Repository<NovelEntity>,
  ) {
    super(novelsRepository)
  }
}