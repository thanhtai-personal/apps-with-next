import { UsersController } from '@/controllers/user/users.controller';
import { BoostEntity } from '@/entities';
import { FamousPersonEntity } from '@/entities/famousPerson.entity';
import { SquadEntity } from '@/entities/squad.entity';
import { UserEntity } from '@/entities/user.entity';
import { ModuleRefInterceptor } from '@/exceptions';
import { UsersService } from '@/services/users/users.service';
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([UserEntity, SquadEntity, FamousPersonEntity, BoostEntity])
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
