import { NextResponse } from "next/server";

const publicPaths = ["/", "/about", "/contact", "/resorts", "/events"];

// List of auth pages that should be inaccessible after login
const authPages = [
  "/auth/login",
  "/auth/signup",
  "/auth/verify-email",
  "/auth/forgot-password",
  "/auth/forgot-password/verify-email",
  "/auth/forgot-password/change-password",
  "/checkout",
];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("bx_auth_token");

  // Check if the path is public
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path)
  );

  // Redirect logged-in users away from auth pages
  if (token && authPages.some((page) => pathname.startsWith(page))) {
    return NextResponse.redirect(new URL("/user/dashboard", request.url));
  }

  // Redirect non-logged-in users trying to access protected pages
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Otherwise allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
