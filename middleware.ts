import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
	// Rewrite /images/ to /api/images/
	if (req.nextUrl.pathname.startsWith('/images/')) {
		const url = req.nextUrl.clone();
		url.pathname = `${process.env.BASE_PATH ?? ''}/api${url.pathname}`;
		return NextResponse.rewrite(url);
	}
	if (process.env.NODE_ENV === 'production') {
		// TODO: Actual logging.
		console.log('request:', req.method, req.nextUrl.pathname);
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
