import { APIResult, ClientApi, CreateApiConfig, HttpErrorCode, TokenMethod, createApi } from "@core-ui/api-client";
import {
  IAbstractService,
  IAPIResponse,
  IBaseControl,
  IBaseSDK,
} from "./types";
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types";


export abstract class BaseSDK implements IBaseSDK {
  protected api: ClientApi<any>;

  constructor(config: CreateApiConfig) {
    this.api = createApi(config);
  }

  protected handleErrorResult(error: any) {
    const message = error ? typeof error === "string" ? error : error?.message || "" : ""
    throw new Error(message);
  }

  protected handleApiResult = <T>(dataReturn: APIResult<IAPIResponse<T>>) => {
    if (dataReturn.data) {
      return dataReturn.data as T;
    } else {
      return dataReturn as T;
    }
  };

  protected getBaseControl: <T, K, P, Q>
    (service: IAbstractService<T, K, P, Q>) =>
    IBaseControl<T, K, P, Q> = <T, K, P, Q>(service: IAbstractService<T, K, P, Q>) => {
      return {
        create: async (createData: T) => {
          try {
            const rs: APIResult<IAPIResponse<P>> | undefined = await service.create?.(createData);
            return rs ? this.handleApiResult(rs) : undefined;
          } catch (error) {
            this.handleErrorResult(error);
          }
        },
        update: async (id: string | number, updateData: K) => {
          try {
            const rs: APIResult<IAPIResponse<P>> | undefined = await service.update?.(
              id,
              updateData,
            );
            return rs ? this.handleApiResult(rs) : undefined;
          } catch (error) {
            this.handleErrorResult(error);
          }
        },
        patchUpdate: async (id: string | number, updateData: Partial<K>) => {
          try {
            const rs: APIResult<IAPIResponse<P>> | undefined = await service.patchUpdate?.(
              id,
              updateData,
            );
            return rs ? this.handleApiResult(rs) : undefined;
          } catch (error) {
            this.handleErrorResult(error);
          }
        },
        getOne: async (id: string | number) => {
          try {
            const rs: APIResult<IAPIResponse<P>> | undefined = await service.getOne?.(id);
            return rs ? this.handleApiResult(rs) : undefined;
          } catch (error) {
            this.handleErrorResult(error);
          }
        },
        getMany: async (filter: Q) => {
          try {
            const rs: APIResult<IAPIResponse<IPagingResponse<P>>> | undefined =
              await service.getMany?.(filter);
            return rs ? this.handleApiResult(rs) : undefined;
          } catch (error) {
            this.handleErrorResult(error);
          }
        },
        getAll: async (filter: Q) => {
          try {
            const rs: APIResult<IAPIResponse<INonPagingResponse<P>>> | undefined =
              await service.getMany?.(filter);
            return rs ? this.handleApiResult(rs) : undefined;
          } catch (error) {
            this.handleErrorResult(error);
          }
        },
        delete: async (id: string | number) => {
          try {
            await service.delete?.(id);
          } catch (error) {
            this.handleErrorResult(error);
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