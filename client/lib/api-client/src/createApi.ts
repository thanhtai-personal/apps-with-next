import { AxiosRequestConfig } from "axios";
import { API, APIResult } from "./API";
import { TokenMethod } from "./consts";
import { Body, Params, PathsWithMethod, SuccessResponse } from "./types";
import { apiUrl, downloadUrl, saveAs } from "./utils";

export interface CreateApiConfig {
  apiEndpoint: string;
  options?: {
    axiosConfig?: AxiosRequestConfig;
    getAccessToken?: () => string;
    tokenMethod?: TokenMethod;
  };
}

export type ClientApi<Paths> = {
  client: API;
  downloadUrl<K extends PathsWithMethod<Paths, "get"> & string>(
    path: K,
    params: Params<Paths, K, "get">
  ): string;
  download<K extends PathsWithMethod<Paths, "get"> & string>(
    path: K,
    params: Params<Paths, K, "get">
  ): Promise<void>;

  get<K extends PathsWithMethod<Paths, "get"> & string>(
    path: K,
    params: Params<Paths, K, "get">
  ): Promise<APIResult<SuccessResponse<Paths, K, "get">>>;

  post<K extends PathsWithMethod<Paths, "post"> & string>(
    path: K,
    params: Params<Paths, K, "post">,
    data?: Body<Paths, K, "post">
  ): Promise<APIResult<SuccessResponse<Paths, K, "post">>>;

  put<K extends PathsWithMethod<Paths, "put"> & string>(
    path: K,
    params: Params<Paths, K, "put">,
    data?: Body<Paths, K, "put">
  ): Promise<APIResult<SuccessResponse<Paths, K, "put">>>;

  delete<K extends PathsWithMethod<Paths, "delete"> & string>(
    path: K,
    params: Params<Paths, K, "delete">
  ): Promise<APIResult<SuccessResponse<Paths, K, "delete">>>;

  patch<K extends PathsWithMethod<Paths, "patch"> & string>(
    path: K,
    params: Params<Paths, K, "patch">,
    data?: Body<Paths, K, "patch">
  ): Promise<APIResult<SuccessResponse<Paths, K, "patch">>>;
};

export function createApi<Paths>(config: CreateApiConfig): ClientApi<Paths> {
  const apiClient = new API(config.apiEndpoint, config.options?.axiosConfig);
  const token = config.options?.getAccessToken?.();
  if (token) {
    apiClient.setAccessToken(
      () => token,
      config?.options?.tokenMethod,
    );
  }

  return {
    get client() {
      return apiClient;
    },
    downloadUrl<K extends PathsWithMethod<Paths, "get"> & string>(
      path: K,
      params: Params<Paths, K, "get">,
    ) {
      return downloadUrl(path, params);
    },
    async download<K extends PathsWithMethod<Paths, "get"> & string>(
      path: K,
      params: Params<Paths, K, "get">,
    ) {
      const url = downloadUrl(path, params);
      return apiClient.get<Blob>(url, { responseType: "blob" }).then((res) => {
        const [path, query] = url.split("?");
        const lastSegment = path?.split("/").pop();
        const fileFormat = new URLSearchParams(query).get("format");

        const contentDisposition: string =
          res.headers["content-disposition"] ||
          res.headers["Content-Disposition"];
        const filename = contentDisposition
          ? contentDisposition.split("filename=")[1]
          : lastSegment
            ? `${lastSegment}.${fileFormat}`
            : `download.${fileFormat}`;
        filename && saveAs(res.data, filename);
      });
    },

    async get<K extends PathsWithMethod<Paths, "get"> & string>(
      path: K,
      params: Params<Paths, K, "get">,
    ) {
      const url = apiUrl(path, params);
      return apiClient.get<SuccessResponse<Paths, K, "get">>(url);
    },
    async post<K extends PathsWithMethod<Paths, "post"> & string>(
      path: K,
      params: Params<Paths, K, "post">,
      data?: Body<Paths, K, "post">,
    ) {
      const url = apiUrl(path, params);
      return apiClient.post<SuccessResponse<Paths, K, "post">>(url, data);
    },
    async put<K extends PathsWithMethod<Paths, "put"> & string>(
      path: K,
      params: Params<Paths, K, "put">,
      data?: Body<Paths, K, "put">,
    ) {
      const url = apiUrl(path, params);
      return apiClient.put<SuccessResponse<Paths, K, "put">>(url, data);
    },
    async delete<K extends PathsWithMethod<Paths, "delete"> & string>(
      path: K,
      params: Params<Paths, K, "delete">,
    ) {
      const url = apiUrl(path, params);
      return apiClient.delete<SuccessResponse<Paths, K, "delete">>(url);
    },
    async patch<K extends PathsWithMethod<Paths, "patch"> & string>(
      path: K,
      params: Params<Paths, K, "patch">,
      data?: Body<Paths, K, "patch">,
    ) {
      const url = apiUrl(path, params);
      return apiClient.patch<SuccessResponse<Paths, K, "patch">>(url, data);
    },
  };
}

export type FetchApi<Paths> = ReturnType<typeof createApi<Paths>>;
