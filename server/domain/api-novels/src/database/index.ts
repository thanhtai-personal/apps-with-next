import { createDBConnection, EntityManager } from '@core-api/nest-typeorm-postgres';
import { dbConnectOptions } from "./dbConnectOptions";
export const goatTapDbConnection = createDBConnection(dbConnectOptions);
export const goatTapDbManager = goatTapDbConnection.getManager();
export const goatTapDbDataSource = goatTapDbConnection.getDataSource();

export const useTransactionQuery = async <T,>(entity: any, queryKey: string, queryFunction: (manager: EntityManager) => Promise<T>) => {
  const queryRunner = goatTapDbDataSource.createQueryRunner();
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