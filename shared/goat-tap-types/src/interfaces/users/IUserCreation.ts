import { ITelegramInfo } from "./ITelegramInfo";
import { ITonWalletInfo } from "./ITonWalletInfo";

export interface IUserCreation {
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
  boosts?: number[];
}