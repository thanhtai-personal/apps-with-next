export interface IPaginationResult {
  prev: () => void | string;
  next: () => void | string;
  first: () => void | string;
  last: () => void | string;
  size: (newSize?: number, triggerOnChange?: boolean) => number | void;
  page: (newPage?: number, triggerOnChange?: boolean) => number | void | string;
}