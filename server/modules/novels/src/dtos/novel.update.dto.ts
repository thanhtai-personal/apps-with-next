import { INovelUpdating } from "../interfaces";

export class UpdateNovelDto implements INovelUpdating {
  id?: number;
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