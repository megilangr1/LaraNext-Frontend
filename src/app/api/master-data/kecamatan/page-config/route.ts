import { authGuard, unauthorized } from "@/lib/sessions";
import { fetchBackend } from "@/shared/helpers/server-fetcher";
import { NextResponse } from "next/server";

export async function GET() {
  const { isValid } = await authGuard();
  if (!isValid) return unauthorized();

  const [status, data] = await fetchBackend(`/v1/references/kecamatan`);
  return NextResponse.json(data, { status });
}
