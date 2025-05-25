import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isPublicPage = request.nextUrl.pathname === '/';

  // 공개 페이지(랜딩 페이지)는 항상 접근 가능
  if (isPublicPage) {
    return NextResponse.next();
  }

  // 인증 페이지에서 이미 로그인된 경우 홈으로 리다이렉트
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 인증이 필요한 페이지에서 토큰이 없는 경우 로그인 페이지로 리다이렉트
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 