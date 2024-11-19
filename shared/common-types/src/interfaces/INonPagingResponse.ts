import { IResponse } from "./IResponse";

export interface INonPagingResponse<T> extends Omit<IResponse<T[]>, "paging"> {}