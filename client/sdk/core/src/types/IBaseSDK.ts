import { TokenMethod } from "@core-ui/api-client";
import { INonPagingResponse, IPagingResponse } from "@core-ui/common-types";

export interface IBaseControl<T, K, P, Q> {
  create?: (createData: T) => Promise<P | undefined>;
  update?: (
    id: string | number,
    updateData: K,
  ) => Promise<P | undefined>;
  patchUpdate?: (
    id: string | number,
    updateData: Partial<K>,
  ) => Promise<P | undefined>;
  getOne?: (id: string | number) => Promise<P | undefined>;
  getMany?: (filter: Q) => Promise<IPagingResponse<P> | undefined>;
  getAll?: (filter: Q) => Promise<INonPagingResponse<P> | undefined>;
  delete?: (
    id: string | number,
  ) => Promise<void | undefined>;
}

export interface IBaseSDK {
  setAccessToken: (token: string, tokenMethod: TokenMethod) => void;
}