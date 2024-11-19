import { IThingEntity } from "@core-modules/core"

export interface IChapter extends IThingEntity {
  name?: string;
  shortDescription?: string;
  fullDescription?: string;
  shortContent?: string;
  content?: string;
  htmlContent?: string;
  referrence?: string;
  thumb?: string;
  view?: number;
  chapterIndex?: number;
}