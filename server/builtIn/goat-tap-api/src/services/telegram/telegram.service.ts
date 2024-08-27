// src/telegram/telegram.service.ts
import { TelegramBotConfig } from '@/config';
import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Markup, Telegraf } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import { UsersService } from "../users/users.service";
import axios from 'axios';
import { CreateUserDto } from "@/dtos/users/user.create.dto";
import { v4 as uuidv4 } from 'uuid';
import { CryptoService } from "../encrypt/encrypt.service";

const generateReferralCode = (length: number = 5): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

@Injectable()
export class TelegramService {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private usersService: UsersService,
    private readonly cryptoService: CryptoService,
  ) { }

  async getTelegramInfo(telegramId: string | number) {
    const response = await axios.get(`${TelegramBotConfig.ORIGIN
      }${TelegramBotConfig.TELEGRAM_BOT_TOKEN
      }/getChat?chat_id=${telegramId}`);
    return response.data.result;
  }

  async generateReferralCode(): Promise<string> {
    let isUnique = false;
    let referralCode: string = "";
    let trialTimes = 0;
    while (!isUnique) {
      referralCode = generateReferralCode();
      let existingUser: any = null;
      try {
        existingUser = await this.usersService.findByReferralCode(referralCode);
      } catch (error) { }
      if (!existingUser) {
        isUnique = true;
      }
      if (trialTimes > 10) {
        isUnique = true;
        referralCode = uuidv4();
      }
      trialTimes++;
    }
    return referralCode;
  }

  async handleStart(ctx: any) {
    const chatId: number = ctx.message?.chat?.id || ctx.callbackQuery?.from.id;
    const startParamsStr = ctx.startPayload as string;
    const startParams: any = startParamsStr ? this.cryptoService.decrypt(startParamsStr) : null;
    let webAppUrl = `${TelegramBotConfig.CLIENT_URL}?telegramId=${chatId}`;
    if (!!startParams) {
      webAppUrl = `${webAppUrl}&startapp=${startParamsStr}`;
    }
    const user = await this.usersService.findOne(chatId);
    if (!user) {
      const telegramInfo = await this.getTelegramInfo(chatId);
      const newRefCode = await this.generateReferralCode();
      const referralParams = await this.cryptoService.encrypt(JSON.stringify({ referralCode: newRefCode }));
      const createUserDto: CreateUserDto = {
        telegramInfo: {
          first_name: telegramInfo.first_name,
          last_name: telegramInfo.last_name,
          telegramId: telegramInfo.id,
          username: telegramInfo.username,
          photo_url: telegramInfo.photo_url,
          auth_date: telegramInfo.auth_date,
        },
        username: telegramInfo.username,
        points: 0,
        energy: 2500,
        renewEnergyTimes: 3,
        famousPersonId: undefined,
        referralCode: newRefCode,
        referralParams,
      };
      if (startParams?.referralCode) {
        const referralBy = await this.usersService.findByReferralCode(startParams.referralCode);
        if (referralBy) {
          createUserDto.referralBy = referralBy.id;
          createUserDto.famousPersonId = referralBy.famousPerson?.id;
        }
      }
    }

    await ctx.reply(
      `Welcome to DCT Goat Tap\n\nYou can make a real impact by supporting your favorite beauty queens and unlocking exclusive rewards. Every tap you make helps your queen get closer to the crown! 👑\n\n💖 Don’t forget to invite your friends – the more, the merrier!\nClick PLAY to start!!! 🌟`,
      Markup.inlineKeyboard([
        [Markup.button.webApp('Play Now', `${webAppUrl}`),
        Markup.button.webApp('Channel', `${webAppUrl}`)],
        [Markup.button.webApp('X/Twitter', `${webAppUrl}`),
        Markup.button.webApp('Community', `${webAppUrl}`),],
        [Markup.button.webApp('Facebook', `${webAppUrl}`),
        Markup.button.webApp('Instagram', `${webAppUrl}`),]
      ]),
    );
  }

  async showTgInfo(ctx: any) {
    const chatId: number = ctx.message?.chat?.id;
    const telegramInfo = await this.getTelegramInfo(chatId);
    ctx.reply(
      `Your public account information is:\n\nID: ${telegramInfo.id || ""}\n\nChat ID: ${chatId || ""}\n\nUser name: ${telegramInfo.username || ""}\n\nFull name: ${telegramInfo.first_name || ""} ${telegramInfo.last_name || ""}\n`
    )
  }

  async handleMessage(ctx: Context) {
    const message = ctx.message as Message.TextMessage;
    switch (message.text) {
      case "/start":
        await this.handleStart(ctx);
        break;
      case "/me":
        await this.showTgInfo(ctx);
        break;
      default:
        await ctx.reply(`Invalid command!`);
    }
  }
}
