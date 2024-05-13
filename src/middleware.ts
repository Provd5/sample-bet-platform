import { type NextRequest, NextResponse } from "next/server";

import { auth } from "./lib/firebase";
import ROUTES from "./utils/routes";

export function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // protecting routes
  const nextUrl = request.nextUrl;
  const normalizedUrl = nextUrl.pathname.endsWith("/")
    ? nextUrl.pathname
    : nextUrl.pathname + "/";
  const pathnameParts = normalizedUrl.split("/").filter((v) => v !== "");
  const isProtected =
    pathnameParts.length > 0 && pathnameParts[0] !== "register";

  if (!isProtected && auth.currentUser) {
    return Response.redirect(new URL(ROUTES.betting, nextUrl));
  }

  if (isProtected && !auth.currentUser) {
    return Response.redirect(new URL(ROUTES.root, nextUrl));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
