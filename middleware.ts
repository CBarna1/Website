import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "kelson_session";

function getSecretKey() {
  return new TextEncoder().encode(process.env.AUTH_SECRET);
}

function isMobileUserAgent(userAgent: string) {
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get("user-agent") ?? "";

  if (pathname === "/admin/desktop-only") {
    return NextResponse.next();
  }

  if (isMobileUserAgent(userAgent)) {
    return NextResponse.redirect(new URL("/admin/desktop-only", request.url));
  }

  if (pathname === "/admin/login") return NextResponse.next();

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    const role = payload.role as string;

    const adminOnlyPaths = ["/admin/users", "/admin/products", "/admin/settings", "/admin/audit-logs"];
    if (adminOnlyPaths.some((path) => pathname.startsWith(path)) && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
