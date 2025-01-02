// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Handle upload endpoints
    if (request.nextUrl.pathname.startsWith('/api/upload-pdf')) {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-middleware-cache', 'no-cache');

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/upload-pdf/:path*'],
};
