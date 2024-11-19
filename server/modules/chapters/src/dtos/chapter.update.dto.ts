import { IChapterUpdating } from "../interfaces";

export class UpdateChapterDto implements IChapterUpdating {
  id?: number;
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