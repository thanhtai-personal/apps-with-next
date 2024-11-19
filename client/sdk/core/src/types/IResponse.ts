import { HttpErrorCode } from "@core-ui/api-client";
import { IErrorResponse } from "./IErrorResponse";

export interface IAPIResponse<T> {
  code?: HttpErrorCode | 200;
  message?: string;
  data: T | IErrorResponse;
}
