import { TokenMethod } from "@core-ui/api-client";
import { Pagination } from "./Pagination";
import { IErrorResponse } from "./IErrorResponse";

export interface IBaseControl<ICreationRequest, IUpdatingRequest, IDataResponse, IFilterRequest> {
  create: (createData: ICreationRequest) => Promise<IDataResponse | IErrorResponse>;
  update: (
    id: string | number,
    updateData: IUpdatingRequest,
  ) => Promise<IDataResponse | IErrorResponse>;
  patchUpdate: (
    id: string | number,
    updateData: Partial<IUpdatingRequest>,
  ) => Promise<IDataResponse | IErrorResponse>;
  getOne: (id: string | number) => Promise<IDataResponse | IErrorResponse>;
  getMany: (filter: IFilterRequest) => Promise<Pagination<IDataResponse> | IErrorResponse>;
  delete: (
    id: string | number,
  ) => Promise<void | IErrorResponse>;
}

export interface IBaseSDK {
  setAccessToken: (token: string, tokenMethod: TokenMethod) => void;
}