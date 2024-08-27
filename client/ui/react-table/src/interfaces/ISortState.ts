import { ESortDirection } from "./ESortDirection";

export interface ISortValue {
  priority: number;
  value: ESortDirection;
  name: string;
}

export interface ISortState {
  [key: string]: ISortValue;
}