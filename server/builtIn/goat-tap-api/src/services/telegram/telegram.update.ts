// src/telegram/telegram.update.ts
import { Update, Ctx, Start, Help, On, Hears, Command } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { TelegramService } from './telegram.service';

@Update()
export class TelegramUpdate {
  constructor(private readonly telegramService: TelegramService) { }

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await this.telegramService.handleStart(ctx);
  }

  @On('text')
  async onMessage(@Ctx() ctx: Context) {
    await this.telegramService.handleMessage(ctx);
  }
}
