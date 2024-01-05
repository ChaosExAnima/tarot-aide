import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
	// Rewrite /images/ to /api/images/
	if (req.nextUrl.pathname.startsWith('/images/')) {
		const url = req.nextUrl.clone();
		url.pathname = `/api${url.pathname}`;
		console.log('redirecting to', url.pathname);

		return NextResponse.rewrite(url);
	}
}
