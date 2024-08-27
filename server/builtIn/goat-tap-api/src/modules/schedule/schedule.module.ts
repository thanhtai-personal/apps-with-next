import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from '@/services/schedule/schedule.service';
import { FamousPersonEntity, UserEntity } from '@/entities';
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { TonModules } from "../ton/ton.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, FamousPersonEntity]),
    ScheduleModule.forRoot(),
    TonModules
  ],
  providers: [ScheduleService],
})
export class AppScheduleModule { }
