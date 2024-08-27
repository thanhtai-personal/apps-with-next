import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from '@/controllers/app/app.controller';
import { AppService } from '@/services/app/app.service';
import { allModule } from '..';
import { DataSource } from '@core-api/nest-typeorm-postgres';
import { AppExceptionsFilter } from '@/decorators/exceptions/AppExceptionsFilter';

@Module({
  imports: allModule,
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: AppExceptionsFilter,
  }],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
