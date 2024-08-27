// src/telegram/telegram.module.ts
import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramBotConfig } from '@/config';
import { TelegramUpdate } from '@/services/telegram/telegram.update';
import { TelegramService } from '@/services/telegram/telegram.service';
import { sessionMiddleware } from '@/middlewares/telegram/session.middleware';
import { UsersModule } from "../user/users.module";
import { CryptoModule } from "../encrypt/encrypt.module";
@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: TelegramBotConfig.TELEGRAM_BOT_TOKEN || "missing-token-config",
        middlewares: [sessionMiddleware],
      }),
    }),
    CryptoModule,
    UsersModule,
  ],
  providers: [TelegramService, TelegramUpdate],
})
export class TelegramModule { }
