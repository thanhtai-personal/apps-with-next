import { IsNotEmpty, IsNumber } from 'class-validator';
import { BoostType, IBoostUpdate } from "@core-ui/goat-tap-types"

export class BoostUpdateDto implements IBoostUpdate {
  @IsNotEmpty()
  id!: number;

  @IsNotEmpty()
  type!: BoostType;

  @IsNotEmpty()
  @IsNumber()
  level!: number;

  @IsNotEmpty()
  @IsNumber()
  pointsPerTap!: number;

  @IsNotEmpty()
  @IsNumber()
  nextLevelPointsPerTap?: number;
  
  expiredAt?: Date;

  @IsNotEmpty()
  @IsNumber()
  goatPrice!: number;

  @IsNumber()
  tonPrice?: number;
}