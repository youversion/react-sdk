import axios, { type AxiosInstance } from "axios";
import { ApiConfig } from "./types";

export type QueryParams = Record<string, string | number | boolean>;
export type RequestData = Record<string, string | number | boolean | object>;

export class ApiClient {
  private http: AxiosInstance;

  constructor(config: ApiConfig) {
    this.http = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout || 10000,
      headers: {
        "Content-Type": "application/json",
        "X-App-ID": config.appId,
      },
    });
  }

  async get<T>(path: string, params?: QueryParams): Promise<T> {
    const response = await this.http.get<T>(path, { params });
    return response.data;
  }

  async post<T>(
    path: string,
    data?: RequestData,
    params?: QueryParams
  ): Promise<T> {
    const response = await this.http.post<T>(path, data, { params });
    return response.data;
  }
}
