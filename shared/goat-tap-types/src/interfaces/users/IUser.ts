// import { RoleEnum } from '@/enums';

import { ITelegramInfo } from './ITelegramInfo';
import { ITonWalletInfo } from './ITonWalletInfo';

export interface IUser {
  id: number;
  telegramInfo: ITelegramInfo;
  tonWalletInfo?: ITonWalletInfo;
  username?: string;
  avatar?: string;
  referralCode?: string;
  referralParams?: string;
  points?: number;
  referralBy?: number;
  energy?: number;
  renewEnergyTimes?: number;
}
