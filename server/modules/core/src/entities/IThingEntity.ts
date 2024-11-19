import { IBaseEntity } from "./IBaseEntity";

export interface IThingEntity extends IBaseEntity {
  hash?: string;
  createdBy?: string;
  updatedBy?: string;
  isArchived?: boolean;
  dateCreate?: Date;
  dateUpdate?: Date;
}