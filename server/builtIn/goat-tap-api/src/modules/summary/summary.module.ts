import { SummaryController } from '@/controllers/summary/summary.controller';
import { FamousPersonEntity } from '@/entities/famousPerson.entity';
import { UserEntity } from '@/entities/user.entity';
import { SummaryService } from '@/services/summary/summary.service';
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([UserEntity, FamousPersonEntity])
  ],
  providers: [SummaryService],
  controllers: [SummaryController],
  exports: [SummaryService],
})
export class SummaryModule { }
