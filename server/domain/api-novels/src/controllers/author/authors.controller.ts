import { AuthorsService } from '@/services/authors/authors.service';
import { AuthorsController as CoreAuthorsController } from "@core-modules/authors"
import { NEST_COMMON } from "@core-api/nest-core"

const { Controller } = NEST_COMMON

@Controller("/authors")
export class AuthorsController extends CoreAuthorsController {
  constructor(protected readonly authorService: AuthorsService) {
    super(authorService);
  }
}
