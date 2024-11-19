import { ICategoryCreation } from "../interfaces";

export class CreateCategoryDto implements ICategoryCreation {
  name?: string;
  description?: string;
  image?: string;
  icon?: string;
}