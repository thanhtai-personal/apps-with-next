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

  // protected readonly abortController = new AbortController();
  protected readonly abortControllers = new Map<CancelToken, AbortController>();

  errorHandlers = new Map<
    HttpErrorCode,
    (error: AxiosResponse, retry: () => Promise<any>) => void
  >();

  /**
   * This is a constructor function that creates an instance of the axios client with a base URL and
   * optional configuration.
   * @param {string} baseUrl - The `baseUrl` parameter is a string that represents the base URL of the
   * API endpoint that the Axios client will be making requests to. It is used to construct the full
   * URL for each request.
   * @param {AxiosRequestConfig} config - The `config` parameter is an optional object that can be
   * passed to the constructor of the class. It is of type `AxiosRequestConfig`, which is an interface
   * provided by the Axios library. This object can contain various configuration options for the Axios
   * client, such as headers, timeout, authentication, etc.
   */
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
    // eslint-disable-next-line import/no-named-as-default-member
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

  /**
   * This function sets the access token for a client by adding an Authorization header to the request
   * with a bearer token obtained from a getter function.
   * @param getter - `getter` is a function that returns a string. In this case, it is used to retrieve
   * an access token that will be used to authenticate API requests.
   */
  setAccessToken(getter: () => string, tokenMethod = TokenMethod.Bearer) {
    this.client.interceptors.request.use((config) => {
      const token = `${tokenMethod} ${getter()}`;
      config.headers[authorizationKey] = token;
      return config;
    });
  }

  /**
   * This function sets an error handler for a specific error code in a REST API.
   * @param {RestErrorCode} code - RestErrorCode is an enum that represents different error codes that
   * can be returned by a REST API. It could include codes such as 400 (Bad Request), 401
   * (Unauthorized), 404 (Not Found), etc.
   * @param handler - The `handler` parameter is a function that takes two arguments:
   * - `error` - The `error` parameter is an AxiosResponse object that contains information about the
   * error that occurred during the request.
   * - `retry` - The `retry` parameter is a function that can be called to retry the request that
   * failed.
   */
  setErrorHandler(
    code: HttpErrorCode,
    handler: (error: AxiosResponse, retry: () => Promise<any>) => void,
  ) {
    this.errorHandlers.set(code, handler);
  }

  /**
   * This function sets up an error handler for Axios requests and handles different types of errors.
   * @param errorsHandler - A function that will handle errors that occur during an HTTP request. It
   * takes in two parameters:
   * - `error` - The `error` parameter is an AxiosResponse object that contains information about the
   * error that occurred during the request.
   * - `retry` - The `retry` parameter is a function that can be called to retry the request that
   * failed.
   */
  onError(errorsHandler: (error: any, retry?: () => Promise<any>) => void) {
    this.client.interceptors.response.use(undefined, (error) => {
      if (!isAxiosError(error)) {
        return errorsHandler(error);
      }
      const { response } = error;
      if (response) {
        const handler = this.errorHandlers.get(response.status);
        const retry = () => this.client.request(response.config);
        if (handler) {
          return handler(response, retry);
        }
        return errorsHandler(response, retry);
      }
      return errorsHandler(error);
    });
  }
}
