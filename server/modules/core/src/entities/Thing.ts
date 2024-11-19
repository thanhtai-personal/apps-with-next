import { Base } from "./Base.js";

export abstract class Thing extends Base {
  declare hash?: string;
  declare createdBy?: string;
  declare updatedBy?: string;
  declare isArchived?: boolean;
  declare dateCreate?: Date;
  declare dateUpdate?: Date;
  declare deletedAt?: Date;
}
