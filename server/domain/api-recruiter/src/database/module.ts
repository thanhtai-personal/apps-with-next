import { TypeOrmModule, DataSource } from '@core-api/nest-typeorm-postgres';
import { dbConnectOptions } from './dbConnectOptions';
import { NEST_COMMON } from "@core-api/nest-core";

@NEST_COMMON.Module({
  imports: [
    TypeOrmModule.forRoot(dbConnectOptions),
  ],
})
export class DbModule {
  constructor(private dataSource: DataSource) {
  }
}