import { ICategoryUpdating } from "../interfaces";

export class UpdateCategoryDto implements ICategoryUpdating {
  id?: number;
  name?: string;
  description?: string;
  image?: string;
  icon?: string;
}