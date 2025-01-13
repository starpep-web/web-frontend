import { NextRequest, NextResponse } from 'next/server';
import { isInternalApiRequestAuthenticated } from '@lib/next/auth';

export const config = {
  matcher: ['/api/:path*']
};

const middleware = (req: NextRequest) => {
  if (!req.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  if (!isInternalApiRequestAuthenticated(req)) {
    return NextResponse.json({
      message: 'You are not authenticated.'
    }, { status: 401 });
  }

  return NextResponse.next();
};

export default middleware;
