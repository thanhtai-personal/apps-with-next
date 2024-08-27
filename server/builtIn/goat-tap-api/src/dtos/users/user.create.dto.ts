import { IsNotEmpty, IsOptional, IsNumber, IsJSON } from 'class-validator';
import { IUserCreation, ITelegramInfo, ITonWalletInfo, } from "@core-ui/goat-tap-types"

export class CreateUserDto implements IUserCreation {
  @IsNumber()
  points?: number;

  @IsNumber()
  energy?: number;

  @IsNumber()
  renewEnergyTimes?: number;

  @IsNumber()
  squadId?: number;

  @IsNumber()
  famousPersonId?: number;

  @IsNotEmpty()
  @IsJSON()
  telegramInfo!: ITelegramInfo;

  @IsJSON()
  tonWalletInfo?: ITonWalletInfo;

  @IsOptional()
  referralBy?: number;

  @IsOptional()
  referralCode?: string;

  @IsOptional()
  referralParams?: string;

  username?: string;

  boosts?: number[];
}