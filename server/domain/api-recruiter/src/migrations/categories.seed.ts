import { MigrationInterface, QueryRunner } from "@core-api/nest-typeorm-postgres";
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import { waitMs } from "./waitms";
import { ICategoryCreation } from "@core-ui/recruiter-types";

export class CategoriesDataSeed implements MigrationInterface {
  name = `CategoriesDataSeed${Date.now()}`

  public async up(queryRunner: QueryRunner): Promise<void> {
    const csvFilePath = path.resolve(__dirname, 'data/categories.csv');
    const records: ICategoryCreation[] = [];

    // Read the CSV file
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row: ICategoryCreation) => {
          records.push(row);
        })
        .on('end', resolve)
        .on('error', reject);
    });
    await queryRunner.startTransaction();
    for (const record of records) {
      // await queryRunner.startTransaction();
      const { name, description } = record;

      try {
        const existing = await queryRunner.query(`SELECT * FROM categories WHERE name = $1`, [name]);
        if (existing && existing.length > 0) {
          await queryRunner.query(
            `UPDATE categories SET description = $2 WHERE name = $1`,
            [name, description]
          );
        } else {
          await queryRunner.query(
            `INSERT INTO categories (name, description) VALUES 
                ($1, $2)`,
            [name, description]
          );
        }
        await queryRunner.commitTransaction();
      } catch (error) {
        // await queryRunner.rollbackTransaction();
      } finally {
        await waitMs(100)
      }
    }
    // await waitMs(1000);
    // await queryRunner.commitTransaction();
    await waitMs(1000);
    if (!queryRunner.isReleased) {
      // await queryRunner.release();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      await queryRunner.query("DELETE FROM categories");
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log("Error during rollback:", error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
