import { ErrorResponse, MainRes, ValidationError } from "../types/api-response";
import { doAlert } from "../components/do-alert";

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export type ClientFetchOptions<TBody = unknown> = {
  method?: Method;
  body?: TBody;
  headers?: HeadersInit;
  signal?: AbortSignal;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

export class ApiError extends Error {
  code: string;
  status?: number;
  payload?: ValidationError | string | null;

  constructor(
    message: string,
    code: string,
    status?: number,
    payload?: ValidationError | string | null,
  ) {
    super(message);
    this.code = code;
    this.status = status;
    this.payload = payload;
  }
}

export async function fetchClient<TRes, TBody = unknown>(
  path: string,
  options: ClientFetchOptions<TBody> = {},
): Promise<MainRes<TRes>> {
  const {
    method = "GET",
    body,
    headers,
    signal,
    cache = "no-store",
    next,
  } = options;

  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  const fetchOptions: RequestInit = {
    method,
    credentials: "include",
    headers: {
      ...headers,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    signal,
    cache,
    ...(next ? { next } : {}),
  };

  try {
    const res = await fetch(`${path}`, fetchOptions);

    if (res.status === 204) {
      return {
        success: true,
        code: "204",
        message: "No Content",
        result: null as TRes,
      };
    }

    let json: MainRes<TRes>;

    try {
      json = await res.json();
    } catch {
      throw new ApiError("Respon tidak valid (bukan JSON)", "500", res.status);
    }

    if (!res.ok) {
      if (!json.success) {
        throw err(json.message, json.code, res.status, json.errors);
      }

      throw err(json.message, json.code, res.status, null);
    }

    return json;
  } catch (err) {
    console.warn("Client Fetch Failed:", err);
    return errCatch(err);
  }
}

function err(
  message: string,
  code: string,
  status?: number,
  error?: ValidationError | string | null,
) {
  return new ApiError(message, code, status, error);
}

function errCatch(error: unknown): ErrorResponse {
  let message = "Internal Server Error";

  if (error instanceof ApiError) {
    console.warn("API Error", error.message, error.status);

    if (error.status === 422) {
      return {
        success: false,
        code: "422",
        message: error.message,
        errors: error.payload || null,
      };
    }

    return {
      success: false,
      code: "500",
      message: error.message,
      errors: null,
    };
  }

  if (error instanceof TypeError) {
    console.warn("Network Error:", error.message);
    message = "Gagal terhubung ke server";
  } else if (error instanceof SyntaxError) {
    console.warn("JSON Error:", error.message);
    message = "Respon bukan JSON";
  } else if (typeof error === "object" && error && "message" in error) {
    message = (error as { message: string }).message;
  }

  return {
    success: false,
    code: "500",
    message,
    errors: null,
  };
}

// Helper untuk SWR, React Query, atau langsung
export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetchClient<T>(url);

  if (!res.success) {
    if (res.code === "401") {
      window.location.href = "/login";
    }

    doAlert(0, `Gagal: ${res.message}`);
    throw new ApiError(res.message, res.code, 500, res.errors);
  }

  return res.result;
};
