import { MigrationInterface, QueryRunner } from "@core-api/nest-typeorm-postgres";
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import { waitMs } from "./waitms";
import { IRoleCreation, IUserCreation } from "@core-ui/ums-types";
import * as bcrypt from "bcrypt"
import { IPermissionCreation } from "@core-modules/permissions";

export class usersDataSeed implements MigrationInterface {
  name = `usersDataSeed${Date.now()}`

  public async up(queryRunner: QueryRunner): Promise<void> {
    const roleCsvFilePath = path.resolve(__dirname, 'data/roles.csv');
    const permissionCsvFilePath = path.resolve(__dirname, 'data/permissions.csv');
    const userCsvFilePath = path.resolve(__dirname, 'data/users.csv');
    const roles: IRoleCreation[] = [];
    const permisions: (IPermissionCreation & { role?: string })[] = [];
    const users: IUserCreation[] = [];

    // Read the CSV file
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(roleCsvFilePath)
        .pipe(csv())
        .on('data', (row: IRoleCreation) => {
          roles.push(row);
        })
        .on('end', resolve)
        .on('error', reject);
    });

    // Read the CSV file
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(permissionCsvFilePath)
        .pipe(csv())
        .on('data', (row: IPermissionCreation & { role?: string }) => {
          permisions.push(row);
        })
        .on('end', resolve)
        .on('error', reject);
    });

    // Read the CSV file
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(userCsvFilePath)
        .pipe(csv())
        .on('data', (row: IUserCreation) => {
          users.push(row);
        })
        .on('end', resolve)
        .on('error', reject);
    });

    await queryRunner.startTransaction();

    for (const record of roles) {
      // await queryRunner.startTransaction();
      const { name, description, type } = record;

      try {
        const existing = await queryRunner.query(`SELECT * FROM roles WHERE name = $1`, [name]);
        if (existing && existing.length > 0) {
          await queryRunner.query(
            `UPDATE roles SET description = $2 and type = $3 WHERE name = $1`,
            [name, description, type]
          );
        } else {
          await queryRunner.query(
            `INSERT INTO roles (name, description, type) VALUES 
                ($1, $2, $3)`,
            [name, description, type]
          );
        }
        await queryRunner.commitTransaction();
      } catch (error) {
        // await queryRunner.rollbackTransaction();
      } finally {
        await waitMs(300)
      }
    }

    for (const record of permisions) {
      // await queryRunner.startTransaction();
      const {
        name,
        description,
        role
      } = record;
      try {
        const currentRole = (await queryRunner.query(`SELECT id FROM roles WHERE type = $1`
          , [role]))[0];
        if (!currentRole) {
          console.log(`Role "${role}" not found.`);
          continue;
        }
        // Check if permission already exists
        const existing = await queryRunner.query(`SELECT * FROM permissions WHERE name = $1 and description = $2`, [name, description]);
        if (existing && existing.length > 0) {
        } else {
          await queryRunner.query(
            `INSERT INTO permissions (name, description, "roleId") VALUES 
                  ($1, $2, $3)`,
            [name, description, currentRole.id]
          );
        }
        await queryRunner.commitTransaction();
      } catch (error) {
        console.log("error", error)
        // await queryRunner.rollbackTransaction();
      } finally {
        await waitMs(300)
      }
    }

    for (const record of users) {
      // await queryRunner.startTransaction();
      const {
        username,
        password = "Aaaa@1111",
        email,
        avatar = "",
        points = 0,
        token = 0,
        level = 0,
        role
      } = record;
      try {

        const currentRole = (await queryRunner.query(`SELECT id FROM roles WHERE type = $1`
          , [role]))[0];
        if (!currentRole) {
          console.log(`Role "${role}" not found.`);
          continue;
        }
        const existing = await queryRunner.query(`SELECT * FROM users WHERE email = $1`, [email]);
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        if (existing && existing.length > 0) {
          await queryRunner.query(
            `UPDATE users SET password = $2, "roleId" = $3 WHERE email = $1`,
            [email, passwordHash, currentRole.id]
          );
        } else {
          await queryRunner.query(
            `INSERT INTO users (username, email, password, salt, "roleId") VALUES 
                ($1, $2, $3, $4, $5)`,
            [username, email, passwordHash, salt, currentRole.id]
          );
        }
        await queryRunner.commitTransaction();
      } catch (error) {
        console.log("error", error)
        // await queryRunner.rollbackTransaction();
      } finally {
        await waitMs(300)
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
      await queryRunner.query("DELETE FROM users");
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log("Error during rollback:", error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // await queryRunner.release();
    }
  }
}
