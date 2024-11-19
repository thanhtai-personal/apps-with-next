import { AuthorEntity } from '@/entities/author.entity';
import { InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { NEST_COMMON } from "@core-api/nest-core";
import { AuthorsService as CoreAuthorsService } from "@core-modules/authors";

const { Injectable } = NEST_COMMON;

@Injectable()
export class AuthorsService extends CoreAuthorsService {
  constructor(
    @InjectRepository(AuthorEntity)
    protected authorsRepository: Repository<AuthorEntity>,
  ) {
    super(authorsRepository)
  }
}