import { IsNotEmpty } from 'class-validator';
import { BoostType } from "@core-ui/goat-tap-types"
import { IBuyBoost } from '@core-ui/goat-tap-types';

export class BuyBoostDto implements IBuyBoost {
  @IsNotEmpty()
  boostType!: BoostType;
}