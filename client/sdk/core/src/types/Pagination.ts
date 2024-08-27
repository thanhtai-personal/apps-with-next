export interface Pagination<IDataResponse> {
  limit: number;
  offset: number;
  total: number;
  data: IDataResponse[];
}
