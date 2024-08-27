import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface IBoostStore {
  error?: any;
  boostItems: any[];
}

// fix import enum errors when use 'import { BoostType } from "@core-ui/goat-tap-types"';
export enum BoostType {
  Normal = "Normal",
  SuperCharge = "SuperCharge",
  MegaCharge = "MegaCharge",
  AutoBoot = "AutoBoot",
}

export const autoBootTonPrice = 0.1;
export const supperChargeDefaultPrice = 200;
export const megaChargeDefaultPrice = 500;

export class BoostStore extends BaseStore implements IBoostStore {
  public error?: any = null;
  public buying?: boolean = false;
  public boostItems: any = [
    {
      name: "supperCharge",
      type: BoostType.SuperCharge,  
      title: "Super Charge",
      level: 0,
      goatPrice: supperChargeDefaultPrice,
      pointsPerTap: 0,
      nextLevelPointsPerTap: 2,
    },
    {
      name: "megaCharge",
      type: BoostType.MegaCharge, 
      title: "Mega Charge",
      level: 0,
      goatPrice: supperChargeDefaultPrice,
      pointsPerTap: 0,
      nextLevelPointsPerTap: 5,
    },
    {
      name: "autoBoot",
      type: BoostType.AutoBoot,
      title: "Auto Boot",
      level: "Fish league",
      tonPrice: autoBootTonPrice,
    }
  ];
  public isConnectingWallet?: boolean = false;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      boostItems: observable,
      buying: observable,
      isConnectingWallet: observable
    });
  }
}