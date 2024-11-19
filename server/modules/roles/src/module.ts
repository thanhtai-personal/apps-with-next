import { NEST_COMMON, NEST_CORE, ModuleRefInterceptor } from "@core-api/nest-core";
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { RoleEntity } from "./entities";
import { RolesService } from "./services/roles.service";
import { RolesController } from "./controllers";

const { Module } = NEST_COMMON;
const { APP_INTERCEPTOR } = NEST_CORE

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity])
  ],
  providers: [
    RolesService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [RolesController],
  exports: [RolesService],
})
  
export class RolesModule { }
