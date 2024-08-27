import { BoostController } from '@/controllers/boost/boost.controller';
import { BoostEntity, UserEntity } from '@/entities';
import { BoostService } from '@/services/boost/boost.service';
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([BoostEntity, UserEntity])
  ],
  providers: [
    BoostService
  ],
  controllers: [BoostController],
  exports: [BoostService],
})
export class BoostModule { }
