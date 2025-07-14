import { betterFetch } from '@better-fetch/fetch';
import type { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

type Sesion = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
    const { data: session } = await betterFetch<Sesion>(
        '/api/auth/get-session',
        {
            baseURL: request.nextUrl.origin,
            headers: {
                cookie: request.headers.get('cookie') || '',
            },
        }
    );

    // 세션 or 쿠기가 없으면 로그인 페이지로 이동
    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard'], // 보호 경로 정의
};
