import { INovelCreation } from "../interfaces";

export class CreateNovelDto implements INovelCreation {
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