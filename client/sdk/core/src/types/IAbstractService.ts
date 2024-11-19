import { APIResult } from "@core-ui/api-client";
import { IAPIResponse } from "./IResponse";
import { IPagingResponse } from "@core-ui/common-types";

export interface IAbstractService<ICreactionRequest, IUpdatingRequest, IDataResponse, IFilterRequest> {
  create?: (createData: ICreactionRequest) => Promise<APIResult<IAPIResponse<IDataResponse>>>;
  update?: (
    id: string | number,
    updateData: IUpdatingRequest,
  ) => Promise<APIResult<IAPIResponse<IDataResponse>>>;
  patchUpdate?: (
    id: string | number,
    updateData: Partial<IUpdatingRequest>,
  ) => Promise<APIResult<IAPIResponse<IDataResponse>>>;
  getOne?: (id: string | number) => Promise<APIResult<IAPIResponse<IDataResponse>>>;
  getMany?: (filter: IFilterRequest) => Promise<APIResult<IAPIResponse<IPagingResponse<IDataResponse>>>>;
  delete?: (
    id: string | number,
  ) => Promise<APIResult<IAPIResponse<void>>>;
}
