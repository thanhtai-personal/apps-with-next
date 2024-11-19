import { createDBConnection, EntityManager } from '@core-api/nest-typeorm-postgres';
import { dbConnectOptions } from "./dbConnectOptions";
export const DbConnection = createDBConnection(dbConnectOptions);
export const DbManager = DbConnection.getManager();
export const DbDataSource = DbConnection.getDataSource();

export const useTransactionQuery = async <T,>(entity: any, queryKey: string, queryFunction: (manager: EntityManager) => Promise<T>) => {
  const queryRunner = DbDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const queryRs = await queryFunction(queryRunner.manager);
    await queryRunner.commitTransaction();
    return queryRs || null;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}

export * from "./module"