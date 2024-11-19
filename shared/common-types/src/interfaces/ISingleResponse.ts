import { IResponse } from "./IResponse";

export interface ISingleResponse<T> extends Omit<IResponse<T>, "paging"> {}