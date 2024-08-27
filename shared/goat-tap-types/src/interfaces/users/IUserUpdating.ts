import { ITelegramInfo } from "./ITelegramInfo";
import { ITonWalletInfo } from "./ITonWalletInfo";

export interface IUserUpdating {
  id: number;
  points?: number;
  energy?: number;
  renewEnergyTimes?: number;
  telegramInfo: ITelegramInfo;
  tonWalletInfo?: ITonWalletInfo;
  referralBy?: number;
  referralCode?: string;
  referralParams?: string;
  squadId?: number;
  famousPersonId?: number;
  username?: string;
}