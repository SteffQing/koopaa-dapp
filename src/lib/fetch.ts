type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type ParamsType = null | number | boolean | string | undefined;

interface FetchOptions<TBody = unknown> extends Omit<RequestInit, "body"> {
  params?: Record<string, ParamsType>;
  body?: TBody;
}

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type Meta = {
  page: number;
  limit: number;
  total?: number;
  totalPages?: number;
};
type FetchResponse<T> = Response & {
  error?: string;
  data?: T;
  ok?: boolean;
  meta?: Meta;
  message?: string;
};

class Fetch {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "/api/";
  }

  private setParams(params: Record<string, ParamsType>): string {
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    }
    return queryParams.toString();
  }

  private async request<T, TBody = unknown>(
    path: string,
    method: HttpMethod,
    options: FetchOptions<TBody> = {}
  ): Promise<FetchResponse<T>> {
    const { params, body, ...fetchOptions } = options;
    let url = `${this.baseUrl}${path}`;

    if (params) {
      const queryString = this.setParams(params);
      url += `?${queryString}`;
    }

    const headers = new Headers(fetchOptions.headers);
    if (!headers.has("Content-Type") && method !== "GET") {
      headers.set("Content-Type", "application/json");
    }

    try {
      const response = await fetch(url, {
        method,
        ...fetchOptions,
        headers,
        body: body ? JSON.stringify(body) : null,
      });

      const { error, data, meta, ok, message } = await response.json();
      return {
        ...response,
        data,
        error,
        meta,
        ok,
        message,
      } as FetchResponse<T>;
    } catch (error) {
      console.error(error);
      throw new Error("");
    }
  }

  // GET doesn't use a body so we set TBody to undefined
  async get<T>(
    path: string,
    options: FetchOptions<undefined> = {}
  ): Promise<FetchResponse<T>> {
    return this.request<T, undefined>(path, "GET", options);
  }

  async post<T, TBody = unknown>(
    path: string,
    options: FetchOptions<TBody> = {}
  ): Promise<FetchResponse<T>> {
    return this.request<T, TBody>(path, "POST", options);
  }

  async put<T, TBody = unknown>(
    path: string,
    options: FetchOptions<TBody> = {}
  ): Promise<FetchResponse<T>> {
    return this.request<T, TBody>(path, "PUT", options);
  }

  async patch<T, TBody = unknown>(
    path: string,
    options: FetchOptions<TBody> = {}
  ): Promise<FetchResponse<T>> {
    return this.request<T, TBody>(path, "PATCH", options);
  }

  async delete<T, TBody = unknown>(
    path: string,
    options: FetchOptions<TBody> = {}
  ): Promise<FetchResponse<T>> {
    return this.request<T, TBody>(path, "DELETE", options);
  }
}

const query = new Fetch();

export default query;
