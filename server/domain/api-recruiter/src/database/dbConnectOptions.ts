import { ConnectionOptions } from '@core-api/nest-typeorm-postgres';
import * as entities from "@/entities"
import * as migrations from "@/migrations"
import { DatabaseConfig } from "@/config";
import { DataSource } from "@core-api/nest-typeorm-postgres";

export const dbConnectOptions = {
  type: 'postgres',
  host: DatabaseConfig.DB_HOST,
  port: DatabaseConfig.DB_PORT,
  username: DatabaseConfig.DB_USER,
  password: DatabaseConfig.DB_PASSWORD,
  database: DatabaseConfig.DB_DATABASE,
  synchronize: true, //process.env.NODE_ENV === 'development' ? true : false,
  logging: DatabaseConfig.DB_LOGGING,
  timezone: '+00:00',
  migrationsTableName: '_typeorm_migrations',
  metadataTableName: '_typeorm_metadata',
  // relative path
  entities,
  migrations,
  // subscribers,
  // cli: {
  // entitiesDir: 'src/entities',
  // migrationsDir: 'src/migrations',
  // subscribersDir: 'src/subscribers',
  // },
  // ssl: process.env.NODE_ENV === 'development' ? false : true,
  ssl: false,
  // extra:
  //   process.env.NODE_ENV !== 'development'
  //     ? null
  //     : {
  //       ssl: {
  //         rejectUnauthorized: false,
  //       },
  //     },
} as ConnectionOptions;

export default new DataSource(dbConnectOptions);