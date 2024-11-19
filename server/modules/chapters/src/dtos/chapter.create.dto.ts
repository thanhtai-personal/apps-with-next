import { IChapterCreation } from "../interfaces";

export class CreateChapterDto implements IChapterCreation {
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