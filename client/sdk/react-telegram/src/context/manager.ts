export interface ITelegramConfig {
  botToken?: string;
}

export class TelegramApiManager {
  private static instance: TelegramApiManager | null = null;
  private botToken?: string;

  constructor(config: ITelegramConfig) {
    this.botToken = config.botToken;
  }

  public static getInstance(config?: ITelegramConfig): TelegramApiManager {
    if (config) {
      this.instance = new TelegramApiManager(config);
    }
    if (!this.instance) {
      console.error("created telegram manager instance without configuration")
      this.instance = new TelegramApiManager({})
    }
    return this.instance;
  }

  createBotApiString = (path: string) => {
    return `https://api.telegram.org/bot${this.botToken}/${path}`
  }
}