import { IThingEntity } from "@core-modules/core"

export interface INovel extends IThingEntity {
  name?: string;
  shortDescription?: string;
  fullDescription?: string;
  referrence?: string;
  thumb?: string;
  star?: number;
  view?: number;
  like?: number;
  follow?: number;
  suggest?: number;
  originalNovelId?: string;
  isFull?: boolean;
  chaptersNumber?: number;
}