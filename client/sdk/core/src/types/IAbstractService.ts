import { APIResult } from "@core-ui/api-client";
import { IResponse } from "./IResponse";
import { Pagination } from "./Pagination";

export interface IAbstractService<ICreactionRequest, IUpdatingRequest, IDataResponse, IFilterRequest> {
  create: (createData: ICreactionRequest) => Promise<APIResult<IResponse<IDataResponse>>>;
  update: (
    id: string | number,
    updateData: IUpdatingRequest,
  ) => Promise<APIResult<IResponse<IDataResponse>>>;
  patchUpdate: (
    id: string | number,
    updateData: Partial<IUpdatingRequest>,
  ) => Promise<APIResult<IResponse<IDataResponse>>>;
  getOne: (id: string | number) => Promise<APIResult<IResponse<IDataResponse>>>;
  getMany: (filter: IFilterRequest) => Promise<APIResult<IResponse<Pagination<IDataResponse>>>>;
  delete: (
    id: string | number,
  ) => Promise<APIResult<IResponse<void>>>;
}
