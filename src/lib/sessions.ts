import { User } from "@/modules/private/user/schema/user.schema";
import { MainRes } from "@/shared/types/api-response";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const backendUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export async function setAccessToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: Number(process.env.SESSION_EXPIRED || 86400),
  });
}

export async function deleteAuthToken() {
  const cookieStore = await cookies();

  cookieStore.delete("access_token");
}

export async function unauthorized() {
  await deleteAuthToken();

  return NextResponse.json(
    {
      success: false,
      code: "401",
      message: "Unauthorized",
      result: null,
    },
    { status: 401 },
  );
}

export async function fetchMe(token: string): Promise<MainRes<User> | false> {
  try {
    const res = await fetch(`${backendUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data: MainRes<User> = await res.json();

    if (!data.success && res.status === 401) {
      return false;
    }

    return data;
  } catch {
    return false;
  }
}

export async function fetchLogout(
  token: string,
): Promise<MainRes<null> | false> {
  const res = await fetch(`${backendUrl}/auth/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: MainRes<null> = await res.json();

  if (!data.success && res.status === 401) {
    return false;
  }

  return data;
}

export async function getServerToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) return null;
  return token;
}

export async function authGuard() {
  const token = await getServerToken();
  if (!token) {
    return {
      isValid: false,
    };
  }
  return {
    isValid: true,
    token,
  };
}
