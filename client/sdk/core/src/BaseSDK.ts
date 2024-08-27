import { APIResult, ClientApi, CreateApiConfig, HttpErrorCode, TokenMethod, createApi } from "@core-ui/api-client";
import {
  IAbstractService,
  IBaseControl,
  IBaseSDK,
  IResponse,
  Pagination,
  IErrorResponse
} from "./types";


export abstract class BaseSDK implements IBaseSDK {
  protected api: ClientApi<any>;

  constructor(config: CreateApiConfig) {
    this.api = createApi(config);
  }

  protected handleErrorResult(error: any) {
    const message = error ? typeof error === "string" ? error : error?.message || "" : ""
    return ({
      message
    }) as IErrorResponse;
  }

  protected handleApiResult = <T>(dataReturn: APIResult<IResponse<T>>) => {
    if (dataReturn.data) {
      return dataReturn.data as T;
    } else {
      return this.handleErrorResult(dataReturn)
    }
  };

  protected getBaseControl: <ICreationRequest, IUpdatingRequest, IDataResponse, IFilterRequest>
    (service: IAbstractService<ICreationRequest, IUpdatingRequest, IDataResponse, IFilterRequest>) =>
    IBaseControl<ICreationRequest, IUpdatingRequest, IDataResponse, IFilterRequest> = <ICreationRequest, IUpdatingRequest, IDataResponse, IFilterRequest>(service: IAbstractService<ICreationRequest, IUpdatingRequest, IDataResponse, IFilterRequest>) => {
    return {
      create: async (createData: ICreationRequest) => {
        try {
          const rs: APIResult<IResponse<IDataResponse>> = await service.create(createData);
          return this.handleApiResult(rs);
        } catch (error) {
          return this.handleErrorResult(error);
        }
      },
      update: async (id: string | number, updateData: IUpdatingRequest) => {
        try {
          const rs: APIResult<IResponse<IDataResponse>> = await service.update(
            id,
            updateData,
          );
          return this.handleApiResult(rs);
        } catch (error) {
          return this.handleErrorResult(error);
        }
      },
      patchUpdate: async (id: string | number, updateData: Partial<IUpdatingRequest>) => {
        try {
          const rs: APIResult<IResponse<IDataResponse>> = await service.patchUpdate(
            id,
            updateData,
          );
          return this.handleApiResult(rs);
        } catch (error) {
          return this.handleErrorResult(error);
        }
      },
      getOne: async (id: string | number) => {
        try {
          const rs: APIResult<IResponse<IDataResponse>> = await service.getOne(id);
          return this.handleApiResult(rs);
        } catch (error) {
          return this.handleErrorResult(error);
        }
      },
      getMany: async (filter: IFilterRequest) => {
        try {
          const rs: APIResult<IResponse<Pagination<IDataResponse>>> =
            await service.getMany(filter);
          return this.handleApiResult(rs);
        } catch (error) {
          return this.handleErrorResult(error);
        }
      },
      delete: async (id: string | number) => {
        try {
          await service.delete(id);
        } catch (error) {
          return this.handleErrorResult(error);
        }
      },
    };
  };

  public setAccessToken(token: string, tokenMethod?: TokenMethod) {
    if (!token) return
    this.api.client.setAccessToken(() => token, tokenMethod)
  }

  public setErrorHandler(code: HttpErrorCode, handler: (error: any, retry: () => Promise<any>) => void) {
    this.api.client.setErrorHandler(code, handler)
  }
}