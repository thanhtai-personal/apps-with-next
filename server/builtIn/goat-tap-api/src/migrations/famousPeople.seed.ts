import { MigrationInterface, QueryRunner } from "@core-api/nest-typeorm-postgres";
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import { waitMs } from "./waitms";
import { IFamousPerson } from "@core-ui/goat-tap-types";

export class FamousPeopleDataSeed implements MigrationInterface {
  name = `FamousPeopleDataSeed${Date.now()}`

  public async up(queryRunner: QueryRunner): Promise<void> {
    const csvFilePath = path.resolve(__dirname, 'data/famous_people.csv');
    const records: IFamousPerson[] = [];

    // Read the CSV file
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row: IFamousPerson) => {
          records.push(row);
        })
        .on('end', resolve)
        .on('error', reject);
    });
    await queryRunner.startTransaction();
    for (const record of records) {
      // await queryRunner.startTransaction();
      const { name, linkTwitter, image, note, project, twitterHandler } = record;
      try {
        await queryRunner.query(
          `INSERT INTO famous_person (name, image, note, project, twitter_handler, link_twitter) VALUES 
              ($1, $2, $3, $4, $5, $6)`,
          [name, image, note, project, twitterHandler, linkTwitter]
        );
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
      await queryRunner.release();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      await queryRunner.query("DELETE FROM famous_person");
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
