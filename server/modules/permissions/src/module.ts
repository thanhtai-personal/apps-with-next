import { NEST_COMMON, NEST_CORE, ModuleRefInterceptor } from "@core-api/nest-core";
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { PermissionEntity } from "./entities";
import { PermissionsService } from "./services/permissions.service";
import { PermissionsController } from "./controllers";

const { Module } = NEST_COMMON;
const { APP_INTERCEPTOR } = NEST_CORE

@Module({
  imports: [
    TypeOrmModule.forFeature([PermissionEntity])
  ],
  providers: [
    PermissionsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [PermissionsController],
  exports: [PermissionsService],
})
  
export class PermissionsModule { }
