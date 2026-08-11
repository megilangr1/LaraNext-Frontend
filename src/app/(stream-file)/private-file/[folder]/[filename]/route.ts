import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const backendUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ folder: string; filename: string }> },
) {
  const { folder, filename } = await params;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) return new Response("File not found", { status: 401 });

  const res = await fetch(`${backendUrl}/private-file/${folder}/${filename}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    return new Response("File not found", { status: res.status });
  }

  // teruskan headers (mime-type, length, dll)
  const headers = new Headers(res.headers);
  return new Response(res.body, { headers });
}
