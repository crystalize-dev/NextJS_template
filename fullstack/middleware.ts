import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const nextJRegex = new RegExp(
        '((?!api|_next/static|_next/image|img/|favicon.ico).*)'
    );

    if (
        path.match(nextJRegex) ||
        path === '/login' ||
        path === '/forgot-password' ||
        path.includes('reset-password')
    ) {
        return NextResponse.next();
    }

    const session = await getToken({
        req,
        secret: process.env.AUTH_SECRET
    });

    if (!session) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}
