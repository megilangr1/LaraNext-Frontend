import { deleteAuthToken, fetchLogout, unauthorized } from "@/lib/sessions";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) return unauthorized();

  const doLogout = await fetchLogout(accessToken);
  if (!doLogout || !doLogout.success) return unauthorized();

  await deleteAuthToken();
  return NextResponse.json(doLogout);
}
