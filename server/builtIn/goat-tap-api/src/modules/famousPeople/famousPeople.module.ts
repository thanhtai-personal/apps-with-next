import { CachingConfig } from '@/config';
import { FamousPeopleController } from '@/controllers/famousPeople/famousPeople.controller';
import { FamousPersonEntity } from '@/entities/famousPerson.entity';
import { FamousPeopleListener } from '@/listeners/famousPeople.listener';
import { FamousPersonService } from '@/services/famousPerson/famousPerson.service';
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([FamousPersonEntity]),
    CacheModule.register({
      ttl: CachingConfig.TTL,
      isGlobal: false,
      logger: "cacheManager"
    })
  ],
  providers: [FamousPersonService, FamousPeopleListener],
  controllers: [FamousPeopleController]
})
export class FamousPeopleModule { }
