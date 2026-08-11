import { fetchMe, unauthorized } from "@/lib/sessions";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) return unauthorized();

  const authCheck = await fetchMe(accessToken);
  if (!authCheck || !authCheck.success) return unauthorized();

  return NextResponse.json(authCheck);
}
