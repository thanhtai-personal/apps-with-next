import { BoostType } from "./BoostType";

export interface IBoostResponse {
  id: number;
  type: BoostType;
  level: number;
  pointsPerTap: number;
  nextLevelPointsPerTap?: number;
  goatPrice: number;
  tonPrice?: number;
  expiredAt?: Date;
}