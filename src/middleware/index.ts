// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const isAuthenticated = request.cookies.get("isAuthenticated");

    // Tambahkan header kustom untuk menunjukkan status autentikasi
    const response = NextResponse.next();
    response.headers.set("x-authenticated-user", isAuthenticated ? "true" : "false");

    // Protect dashboard routes
    if (!isAuthenticated && request.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Redirect authenticated users away from login
    if (isAuthenticated && request.nextUrl.pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return response;
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"],
};
