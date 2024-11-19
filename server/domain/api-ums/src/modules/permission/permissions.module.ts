import { PermissionsController } from '@/controllers/permission/permissions.controller';
import { PermissionEntity } from '@/entities/permission.entity';
import { PermissionsService } from '@/services/permissions/permissions.service';
import { ModuleRefInterceptor, NEST_COMMON, NEST_CORE, NEST_JWT } from "@core-api/nest-core";
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';

const { Module } = NEST_COMMON
const { APP_INTERCEPTOR } = NEST_CORE
const { JwtModule } = NEST_JWT

@Module({
  imports: [
    JwtModule,
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
