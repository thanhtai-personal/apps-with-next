import { IPagingState } from "./IPagingState";

export interface IPaginationProps {
  offset?: number;
  limit?: number;
  total?: number;
  onChange?: (paging: IPagingState) => void;
}