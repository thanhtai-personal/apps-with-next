export interface IPagination<IDataResponse> {
  limit: number;
  offset: number;
  total: number;
  data: IDataResponse[];
}
