import { IsNotEmpty, IsNumber } from 'class-validator';
import { BoostType, IBoostCreation } from "@core-ui/goat-tap-types"

export class CreateBoostDto implements IBoostCreation {
  @IsNotEmpty()
  type!: BoostType;

  @IsNotEmpty()
  @IsNumber()
  level!: number;

  @IsNotEmpty()
  userId!: number;

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