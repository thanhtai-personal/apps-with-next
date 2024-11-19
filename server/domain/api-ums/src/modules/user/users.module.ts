import { UsersController } from '@/controllers/user/users.controller';
import { UserEntity } from '@/entities/user.entity';
import { UsersService } from '@/services/users/users.service';
import { ModuleRefInterceptor, NEST_COMMON, NEST_CORE, NEST_JWT } from "@core-api/nest-core";
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';

const { Module } = NEST_COMMON
const { APP_INTERCEPTOR } = NEST_CORE
const { JwtModule } = NEST_JWT

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [
    UsersService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule { }
