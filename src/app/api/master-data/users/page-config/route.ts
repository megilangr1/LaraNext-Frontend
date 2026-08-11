import { authGuard, unauthorized } from "@/lib/sessions";
import { fetchBackend } from "@/shared/helpers/server-fetcher";
import { NextResponse } from "next/server";

/**
 * GET /api/master-data/pengguna/page-config
 * Mengambil referensi roles untuk formulir pengguna
 */
export async function GET() {
  const { isValid } = await authGuard();
  if (!isValid) return unauthorized();

  const [status, data] = await fetchBackend(`/v1/references/roles`);
  return NextResponse.json(data, { status });
}
