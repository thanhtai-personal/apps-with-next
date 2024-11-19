import { IPagination } from "./IPagination";

export interface IResponse<T> {
  data: T;
  paging: IPagination;
}