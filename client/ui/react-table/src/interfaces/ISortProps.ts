import { ESortDirection } from "./ESortDirection";

export interface ISortProps {
  columnNames: string[];
  defaultSortField?: string;
  defaultValue?: ESortDirection;
  multipleSort?: boolean;
  onChange?: (sortedValues: string[]) => void;
}