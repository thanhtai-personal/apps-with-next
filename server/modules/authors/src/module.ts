import { NEST_COMMON, NEST_CORE, ModuleRefInterceptor } from "@core-api/nest-core";
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { AuthorEntity } from "./entities";
import { AuthorsService } from "./services/authors.service";
import { AuthorsController } from "./controllers";

const { Module } = NEST_COMMON;
const { APP_INTERCEPTOR } = NEST_CORE

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorEntity])
  ],
  providers: [
    AuthorsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [AuthorsController],
  exports: [AuthorsService],
})
  
export class AuthorsModule { }
