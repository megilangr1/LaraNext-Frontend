import { cookies } from "next/headers";
import { ErrorResponse, MainRes } from "../types/api-response";

const backendUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

type FetchBackend = <T>(
  path: string,
  init?: RequestInit,
) => Promise<[number, MainRes<T>]>;

export const fetchBackend: FetchBackend = async <T>(
  path: string,
  init?: RequestInit,
): Promise<[number, MainRes<T>]> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    if (!accessToken) return unauthorized();

    const isFormData = init?.body instanceof FormData;

    const fetchConfig = {
      ...init,
      headers: {
        Accept: "application/json",
        ...init?.headers,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
    };

    const [res, data] = await doFetch<T>({
      path,
      token: accessToken,
      fetchConfig,
    });

    if (!data.success && res.status === 401) return unauthorized();

    return [res.status, data];
  } catch (err) {
    console.error("Fetch Backend Failed:", err);

    return [500, fallbackError];
  }
};

async function doFetch<T>({
  path,
  fetchConfig,
  token,
}: {
  path: string;
  fetchConfig?: RequestInit;
  token: string;
}): Promise<[Response, MainRes<T>]> {
  const headersObj =
    fetchConfig?.headers instanceof Headers
      ? Object.fromEntries(fetchConfig.headers.entries())
      : fetchConfig?.headers || {};

  const res = await fetch(`${backendUrl}${path}`, {
    ...fetchConfig,
    headers: {
      ...headersObj,
      Authorization: `Bearer ${token}`,
    },
  });

  let data: MainRes<T>;
  try {
    data = await res.json();
  } catch (err) {
    console.error("doFetch Failed:", err);

    return [res, fallbackError];
  }

  return [res, data];
}

async function unauthorized(): Promise<[number, ErrorResponse]> {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");

  return [401, fallbackUnauthorized];
}

const fallbackError: ErrorResponse = {
  success: false,
  code: "500",
  message: "Terjadi kesalahan jaringan atau sistem",
  errors: null,
};

const fallbackUnauthorized: ErrorResponse = {
  success: false,
  code: "401",
  message: "Terjadi kesalahan jaringan atau sistem (Unauthorized)",
  errors: null,
};

export async function fetchBackendFile(path: string): Promise<Response> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value || "";

  if (!accessToken) return new Response("Unauthorized", { status: 401 });

  const res = await doFetchFile(path, accessToken);
  if (res.status === 401) return new Response("Unauthorized", { status: 401 });

  return new Response(res.body, {
    status: res.status,
    headers: res.headers,
  });
}

async function doFetchFile(path: string, token: string) {
  return fetch(`${backendUrl}${path}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}
