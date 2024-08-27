import { BoostType } from "@core-ui/goat-tap-types";

export const goatPriceConfig = {
  [BoostType.SuperCharge.toString()]: 200,
  [BoostType.MegaCharge.toString()]: 500,
};

export const tonPriceConfig = {
  [BoostType.AutoBoot.toString()]: 0.1,
  autoBoostValue: 12,
};

export const superChargeLevelPrices = [400, 1000, 2500, 5000, 10000, 25000, 50000, 100000]
export const superChargeLevelPoints = [2, 5, 10, 15, 20, 25, 30, 50]

export const megaChargeLevelPrices = [1000, 3000, 6000, 9000, 15000, 35000, 65000, 120000]
export const megaChargeLevelPoints = [6, 14, 22, 30, 36, 42, 48, 54]

export const calculateNewPrice = (boostType: BoostType, newLevel: number) => {
  switch (boostType) {
    case BoostType.SuperCharge:
      if (newLevel >= superChargeLevelPrices.length) {
        return superChargeLevelPrices[superChargeLevelPrices.length - 1]! + 50000;
      }
      return superChargeLevelPrices[newLevel - 1];
    case BoostType.MegaCharge:
      if (newLevel >= megaChargeLevelPrices.length) {
        return megaChargeLevelPrices[megaChargeLevelPrices.length - 1]! + 60000;
      }
      return megaChargeLevelPrices[newLevel - 1];
  }
}

export const calculateNewXP = (boostType: BoostType, newLevel: number) => {
  switch (boostType) {
    case BoostType.SuperCharge:
      if (newLevel >= superChargeLevelPoints.length) {
        return superChargeLevelPoints[superChargeLevelPoints.length - 1]! + 2;
      }
      return superChargeLevelPoints[newLevel - 1];
    case BoostType.MegaCharge:
      if (newLevel >= megaChargeLevelPoints.length) {
        return megaChargeLevelPoints[megaChargeLevelPoints.length - 1]! + 5;
      }
      return megaChargeLevelPoints[newLevel - 1];
  }
}