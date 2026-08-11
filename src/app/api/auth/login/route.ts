import { setAccessToken } from "@/lib/sessions";
import { LoginSchema } from "@/modules/auth/schema/login.schema";
import { LoginResponse } from "@/modules/auth/types/login-response";
import { MainRes } from "@/shared/types/api-response";
import { NextRequest, NextResponse } from "next/server";

const backendUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export async function POST(req: NextRequest) {
  try {
    const body: LoginSchema = await req.json();

    const request = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const res: MainRes<LoginResponse> = await request.json();
    if (!res.success) return NextResponse.json(res, { status: request.status });

    const { user, token } = res.result;
    await setAccessToken(token);

    return NextResponse.json({ ...res, data: user }, { status: 200 });
  } catch {
    const fallback: MainRes<null> = {
      success: false,
      code: "500",
      message: "Gagal Meraih Server !",
      errors: null,
    };

    return NextResponse.json(fallback, { status: 500 });
  }
}
