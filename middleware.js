import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/sign-up" || path === "/get-started";

  const token = request.cookies.get("lotus_auth_token");

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/user/dashboard", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/user/dashboard",
    "/login",
    "/sign-up",
    "/user/property-information",
    "/user/service-request",
    "/user/documents",
    "/user/walk-thru",
    "/user/concierge-request",
    "/user/pre-arrival-notification",
    "/user/departure-notification",
    "/user/home-improvement",
    "/user/contact-cm",
  ],
};
