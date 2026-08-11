import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/login";
  const protectedPaths = ["/dashboard", "/master-data"];

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // ✅ Jika user sudah login dan akses /login → redirect ke /dashboard
  if (isAuthPage && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 🔒 Jika halaman protected tapi tidak ada refresh_token → redirect ke /login
  if (isProtected && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
