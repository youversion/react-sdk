import axios, { type AxiosInstance } from "axios";
import { ApiConfig } from "./types";

export type QueryParams = Record<string, string | number | boolean>;
export type RequestData = Record<string, string | number | boolean | object>;

/**
 * ApiClient is a lightweight HTTP client for interacting with the API using Axios.
 * It provides convenient methods for GET and POST requests with typed responses.
 */
export class ApiClient {
  private http: AxiosInstance;
  public config: ApiConfig;

  /**
   * Creates an instance of ApiClient.
   *
   * @param config - The API configuration object containing baseUrl, timeout, and appId.
   */
  constructor(config: ApiConfig) {
    this.config = {
      version: config.version || "v1",
      ...config,
    };
    this.http = axios.create({
      baseURL: config.baseUrl || "https://api-dev.youversion.com",
      timeout: config.timeout || 10000,
      headers: {
        "Content-Type": "application/json",
        "X-App-ID": config.appId,
      },
    });
  }

  /**
   * Sends a GET request to the specified API path with optional query parameters.
   *
   * @typeParam T - The expected response type.
   * @param path - The API endpoint path (relative to baseURL).
   * @param params - Optional query parameters to include in the request.
   * @returns A promise resolving to the response data of type T.
   */
  async get<T>(path: string, params?: QueryParams): Promise<T> {
    const response = await this.http.get<T>(`/${this.config.version}/${path}`, {
      params,
    });
    return response.data;
  }

  /**
   * Sends a POST request to the specified API path with optional data and query parameters.
   *
   * @typeParam T - The expected response type.
   * @param path - The API endpoint path (relative to baseURL).
   * @param data - Optional request body data to send.
   * @param params - Optional query parameters to include in the request.
   * @returns A promise resolving to the response data of type T.
   */
  async post<T>(
    path: string,
    data?: RequestData,
    params?: QueryParams
  ): Promise<T> {
    const response = await this.http.post<T>(
      `/${this.config.version}/${path}`,
      data,
      { params }
    );
    return response.data;
  }
}
