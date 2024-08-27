import { ITelegramInfo, ITonWalletInfo, IUserUpdating } from '@core-ui/goat-tap-types';
import { IsNotEmpty, IsOptional, IsNumber, IsJSON } from 'class-validator';

export class UpdateUserDto implements IUserUpdating {
  @IsNotEmpty()
  @IsNumber()
  id!: number;

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

  username?: string;
}