import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/", "/edit", "/interest"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  const cookie = cookies();
  const auth = cookie.get("token")?.value;

  if (isProtectedRoute && !auth) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  if (auth && path === "/auth/login") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
