import { RolesController } from '@/controllers/role/roles.controller';
import { RoleEntity } from '@/entities/role.entity';
import { RolesService } from '@/services/roles/roles.service';
import { ModuleRefInterceptor, NEST_COMMON, NEST_CORE } from "@core-api/nest-core";
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';

const { Module } = NEST_COMMON
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
