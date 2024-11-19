import { NestFactory } from '@nestjs/core';


export class NestManager {
  private app: any | null = null;
  private isLoaded: boolean;

  constructor(modules: any) {
    this.isLoaded = false;
    this.getApp(modules);
  }

  private async getApp(modules: any) {
    try {
      this.app = await NestFactory.create(modules);
      this.isLoaded = true;
    } catch (error) {
      console.error("CREATE NEST APP ERROR", error)
    }
  }

  public async start(port?: number) {
    try {
      if (this.isLoaded) {
        await this.app.listen(port || 3000);
      } else {
      console.log("Retrying start nest app...")
      setTimeout(async () => {
          await this.app.listen(port || 3000);
        }, 1000)
      }
    } catch (error) {
      console.error("START NEST APP ERROR", error)
    }
  }
}