import { DataSource, EntityManager, ConnectionOptions } from "typeorm";

export class DBConnection {
  private static instance: DBConnection | null = null;
  private datasource: DataSource | null = null;
  private manager: EntityManager | null = null;
  private config: ConnectionOptions;

  private constructor(dbConnection: ConnectionOptions) {
    this.config = dbConnection;
  }

  public static getInstance(connectionOptions?: ConnectionOptions): DBConnection {
    if (!this.instance) {
      if (connectionOptions) {
        this.instance = new DBConnection(connectionOptions);
        this.instance.initialize();
      } else {
        throw new Error("Database connection not initialized because of no connection options");
      }
    }
    return this.instance;
  }

  private initialize() {
    const maindataSource = new DataSource(this.config);
    try {
      maindataSource.initialize();
      this.datasource = maindataSource;
      this.manager = maindataSource.manager;
    } catch (err) {
      throw new Error("Failed to initialize Data Source");
    }
  }

  public getManager(): EntityManager {
    if (!this.manager) {
      throw new Error("Data Source not initialized");
    }
    return this.manager;
  }

  public getDataSource(): DataSource {
    if (!this.datasource) {
      throw new Error("Data Source not initialized");
    }
    return this.datasource;
  }
}

export const createDBConnection = (connectionOptions?: ConnectionOptions) => DBConnection.getInstance(connectionOptions);