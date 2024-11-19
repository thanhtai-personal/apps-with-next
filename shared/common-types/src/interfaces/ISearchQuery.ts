import { IPagination } from "./IPagination";

export interface ISearchQuery<T> {
  paging?: IPagination;
  filter?: T;
  sort?: string;
  sortObj?: {
    column?: string;
    direction?: "ASC" | "DESC" | string;
  };
}