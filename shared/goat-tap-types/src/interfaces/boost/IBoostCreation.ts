import { BoostType } from "./BoostType";

export interface IBoostCreation {
  type: BoostType;
  level: number;
  pointsPerTap: number;
  nextLevelPointsPerTap?: number;
  userId?: number;
  goatPrice: number;
  tonPrice?: number;
  expiredAt?: Date;
}