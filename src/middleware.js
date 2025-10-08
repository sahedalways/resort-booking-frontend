import { NextResponse } from "next/server";

const publicPaths = [
  "/",
  "/contact",
  "/about",
  "/auth/login",
  "/auth/signup",
  "/forgot-password",
  "/auth/verify-email",
];

// Middleware
export function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("bx_auth_token");

  // Public paths + dynamic public routes
  const isPublicPath =
    publicPaths.includes(path) ||
    path.startsWith("/resorts") ||
    path.startsWith("/events");

  if ((path === "/auth/login" || path === "/auth/signup") && token) {
    return NextResponse.redirect(new URL("/user/dashboard", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Otherwise allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
