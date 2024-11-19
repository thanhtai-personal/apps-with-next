import { AuthorsController } from '@/controllers/author/authors.controller';
import { AuthorEntity } from '@/entities/author.entity';
import { AuthorsService } from '@/services/authors/authors.service';
import { ModuleRefInterceptor, NEST_COMMON, NEST_CORE } from "@core-api/nest-core";
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';

@NEST_COMMON.Module({
  imports: [
    TypeOrmModule.forFeature([AuthorEntity])
  ],
  providers: [
    AuthorsService,
    {
      provide: NEST_CORE.APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [AuthorsController],
  exports: [AuthorsService],
})
export class AuthorsModule { }
