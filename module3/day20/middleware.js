import { NextResponse } from "next/server";

export function middleware(request) {
  // Safe guard: check request and cookies existence
  const session = request?.cookies ? request.cookies.get("session") : null;

  if (!session?.value) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*"],
};
