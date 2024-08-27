import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import * as crypto from 'crypto';
import { calculateNewPrice, calculateNewXP, TelegramBotConfig, tonPriceConfig } from '@/config';
import { CreateUserDto } from '@/dtos/users/user.create.dto';
import { v4 as uuidv4 } from 'uuid';
import { BoostService } from '../boost/boost.service';
import { UserEntity } from "@/entities";
import { BoostType } from "@core-ui/goat-tap-types";
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

const generateReferralParams = (length: number = 12): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private boostService: BoostService,
    private jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) { }

  validateTelegramData(query: any): boolean {
    const secret = crypto.createHash('sha256').update(TelegramBotConfig.TELEGRAM_BOT_TOKEN!).digest();
    const dataCheckString = Object.keys(query)
      .filter((key) => key !== 'hash')
      .sort()
      .map((key) => `${key}=${query[key]}`)
      .join('\n');
    const hash = crypto.createHmac('sha256', secret).update(dataCheckString).digest('hex');

    return hash === query.hash;
  }

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

  async generateReferralParams(): Promise<string> {
    let isUnique = false;
    let referralParams: string = "";
    let trialTimes = 0;
    while (!isUnique) {
      referralParams = generateReferralParams();
      let existingUser: any = null;
      try {
        existingUser = await this.usersService.findByReferralParams(referralParams);
      } catch (error) { }
      if (!existingUser) {
        isUnique = true;
      }
      if (trialTimes > 10) {
        isUnique = true;
        referralParams = uuidv4();
      }
      trialTimes++;
    }
    return referralParams;
  }

  async getUser(id: string | number): Promise<any> {
    try {
      const user = await this.usersService.findOne(Number(id));
      if (user) {
        return {
          access_token: await this.jwtService.signAsync({ user }),
          user
        };
      } else {
        return {
          error: { message: "unauthorized" },
          exception: new HttpException("unauthorized", HttpStatus.UNAUTHORIZED),
        };
      }
    } catch (error: any) {
      return {
        error,
        exception: new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR),
      };
    }
  }

  async signIn(telegramId: string | number, referralParams?: string): Promise<any> {
    try {
      let user: UserEntity | undefined = await this.usersService.findByTelegramId(telegramId, true) as UserEntity;
      if (!user) {
        const telegramInfo = await this.getTelegramInfo(telegramId);
        const newRefCode = await this.generateReferralCode();
        const newReferralParams = await this.generateReferralParams();
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
          referralParams: newReferralParams,
        };
        user = await this.usersService.add(createUserDto, true) as UserEntity;
      }
      if (referralParams) {
        const referralUser: UserEntity = await this.usersService.findByReferralParams(referralParams, true) as UserEntity;
        if (referralUser) {
          user.referralBy = referralUser.id;
          if (!user.famousPerson) {
            user.famousPerson = referralUser.famousPerson;
          }
        }
      }
      if (!user.boosts || user.boosts.length === 0) {
        await this.boostService.create({
          level: 1,
          type: BoostType.SuperCharge,
          userId: user!.id,
          goatPrice: calculateNewPrice(BoostType.SuperCharge, 1) || 0,
          tonPrice: 0,
          expiredAt: new Date(),
          pointsPerTap: 0,
          nextLevelPointsPerTap: calculateNewXP(BoostType.SuperCharge, 1)
        }, user);
        await this.boostService.create({
          level: 1,
          type: BoostType.MegaCharge,
          userId: user!.id,
          goatPrice: calculateNewPrice(BoostType.MegaCharge, 1) || 0,
          tonPrice: 0,
          expiredAt: new Date(),
          pointsPerTap: 0,
          nextLevelPointsPerTap: calculateNewXP(BoostType.MegaCharge, 1)
        }, user);
        await this.boostService.create({
          level: 0,
          type: BoostType.AutoBoot,
          userId: user!.id,
          goatPrice: 0,
          tonPrice: Number(tonPriceConfig[BoostType.AutoBoot]),
          expiredAt: new Date(),
          pointsPerTap: 0,
          nextLevelPointsPerTap: 0
        }, user);
      }
      const updatedUser = await this.usersService.update(user.id, user);
      const rsUser = await this.usersService.findOne(updatedUser.id)
      return {
        access_token: await this.jwtService.signAsync({ user: rsUser }),
        user: rsUser
      };
    } catch (error: any) {
      console.log("Login error", error)
      return {
        error,
        exception: new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR),
      };
    }
  }
}
