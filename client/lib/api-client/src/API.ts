import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
  CancelToken,
  RawAxiosResponseHeaders,
  isAxiosError,
} from "axios";
import { HttpErrorCode, TokenMethod, authorizationKey } from "./consts";

export interface APIResult<T> {
  abort: () => void;
  data: T;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
}

export class API {
  protected client!: AxiosInstance;

  protected readonly abortControllers = new Map<CancelToken, AbortController>();

  errorHandlers = new Map<
    HttpErrorCode,
    (error: AxiosResponse, retry: () => Promise<any>) => void
  >();

  constructor(
    protected readonly baseUrl: string,
    protected readonly config: AxiosRequestConfig = {},
  ) {
    this.client = axios.create({
      ...config,
      baseURL: baseUrl,
    });
  }

  protected createAbortSignal = (cancelToken: CancelToken) => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  protected abort = (cancelToken: CancelToken) => {
    const controller = this.abortControllers.get(cancelToken);
    if (controller) {
      controller.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  protected async request<T>(
    config: AxiosRequestConfig,
  ): Promise<APIResult<T>> {
    const source = axios.CancelToken.source();
    const signalKey = source.token;
    const signal = this.createAbortSignal(signalKey);

    const result = await this.client.request<T>({
      ...config,
      signal,
    });

    return {
      data: result.data,
      abort: () => this.abort(signalKey),
      headers: result.headers,
    };
  }

  public get<T>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, method: "GET" });
  }

  public post<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, data, method: "POST" });
  }

  public put<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, data, method: "PUT" });
  }

  public patch<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, data, method: "PATCH" });
  }

  public delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, method: "DELETE" });
  }

  setAccessToken(getter: () => string, tokenMethod = TokenMethod.Bearer) {
    this.client.interceptors.request.use((config) => {
      const token = `${tokenMethod} ${getter()}`;
      config.headers[authorizationKey] = token;
      return config;
    });
  }

  setErrorHandler(
    code: HttpErrorCode,
    handler: (error: AxiosResponse, retry: () => Promise<any>) => void,
  ) {
    this.errorHandlers.set(code, handler);
  }

  async refreshAccessToken(): Promise<string | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/auth/refresh-token`, {}, {
        withCredentials: true, // Ensure cookies are sent
      });
      return response.data.accessToken; // Adjust based on your response structure
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      return null; // Handle the error appropriately
    }
  }

  onError(errorsHandler: (error: any, retry?: () => Promise<any>) => void) {
    this.client.interceptors.response.use(undefined, async (error) => {
      if (!isAxiosError(error)) {
        return errorsHandler(error);
      }
      const { response } = error;
      if (response) {
        const handler = this.errorHandlers.get(response.status);
        const retry = async () => {
          // If unauthorized, attempt to refresh the token
          if (response.status === 401) {
            const newAccessToken = await this.refreshAccessToken();
            if (newAccessToken) {
              // Update the token in the config and retry the original request
              response.config.headers[authorizationKey] = `${TokenMethod.Bearer} ${newAccessToken}`;
              return this.client.request(response.config);
            }
          }
          return this.client.request(response.config);
        };
        if (handler) {
          return handler(response, retry);
        }
        return errorsHandler(response, retry);
      }
      return errorsHandler(error);
    });
  }
}
