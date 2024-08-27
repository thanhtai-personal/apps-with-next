import { IBoostResponse } from "../boost";
import { IFamousPeopleResponse } from "../famousPeople";
// import { ISquad } from "../squad";
import { ITelegramInfo } from "./ITelegramInfo";
import { ITonWalletInfo } from "./ITonWalletInfo";

export interface IUserResponse {
  id: number;
  telegramInfo: ITelegramInfo;
  tonWalletInfo?: ITonWalletInfo;
  referralBy?: number;
  referralCode?: string;
  referralParams?: string;
  points?: number;
  // squad?: ISquadResponse;
  famousPerson?: IFamousPeopleResponse;
  energy?: number;
  renewEnergyTimes?: number;
  boosts: IBoostResponse[];
}
