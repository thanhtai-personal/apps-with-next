import { Module } from '@nestjs/common';
import { TypeOrmModule, DataSource } from '@core-api/nest-typeorm-postgres';
import { dbConnectOptions } from './dbConnectOptions';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConnectOptions),
  ],
})
export class DbModule {
  constructor(private dataSource: DataSource) {
  }
}