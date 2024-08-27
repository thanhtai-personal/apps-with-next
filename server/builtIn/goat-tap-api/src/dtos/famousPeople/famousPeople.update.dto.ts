import { IFamousPeopleUpdate } from "@core-ui/goat-tap-types";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UpdateFamousPersonDto implements IFamousPeopleUpdate {
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  name!: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  linkTwitter?: string;

  @IsOptional()
  twitterHandler?: string;

  @IsOptional()
  project?: string;

  @IsOptional()
  note?: string;

  @IsOptional()
  groupPoints?: number;
}