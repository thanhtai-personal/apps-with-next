import { ISortState } from "./ISortState";

export interface ISortResult {
  sorts: (newSorts?: ISortState) => any[]; // Change 'any[]' to whatever type your sorted values are
  sort: ISortState;
  sorting: (key: string) => void;
}