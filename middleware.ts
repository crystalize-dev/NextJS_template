import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const PUBLIC_FILE = /\.(.*)$/;
    const nextPaths = [
        '/_next',
        '/favicon.ico',
        '/api',
        '/img',
        '/_next/static',
        '/_next/image'
    ];

    // Если путь является стандартным для Next.js, просто пропускаем его
    if (nextPaths.some((p) => path.startsWith(p)) || PUBLIC_FILE.test(path)) {
        return NextResponse.next();
    }

    // Пропускаем страницы входа, сброса пароля
    if (
        path === '/register' ||
        path === '/login' ||
        path === '/forgot-password' ||
        path.includes('reset-password')
    ) {
        return NextResponse.next();
    }

    // Проверяем авторизационную сессию
    const session = await getToken({
        req,
        secret: process.env.AUTH_SECRET
    });

    // Если сессии нет, делаем редирект на страницу входа
    if (!session) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Если все проверки пройдены, пропускаем запрос
    return NextResponse.next();
}
