import { TonController } from "@/controllers/ton/ton.controller";
import { BoostEntity } from "@/entities";
import { TransactionEntity } from "@/entities/transaction.entity";
import { UserEntity } from '@/entities/user.entity';
import { ModuleRefInterceptor } from "@/exceptions";
import { TonApiService } from "@/services/ton/ton.service";
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([UserEntity, TransactionEntity, BoostEntity])
  ],
  providers: [
    TonApiService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [TonController],
  exports: [TonApiService],
})
export class TonModules { }
