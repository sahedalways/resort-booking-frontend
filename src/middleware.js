import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/" ||
    path === "/auth/login" ||
    path === "/auth/signup" ||
    path === "/contact" ||
    path === "/about" ||
    path === "/forgot-password" ||
    path === "/auth/verify-email" ||
    path.startsWith("/resorts") ||
    path.startsWith("/events");

  const token = request.cookies.get("bx_auth_token");

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/user/dashboard", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
