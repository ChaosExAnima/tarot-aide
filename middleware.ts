import { verifyRequestOrigin } from 'lucia';
import { NextRequest, NextResponse } from 'next/server';

function handleImages(req: NextRequest) {
	const url = req.nextUrl.clone();
	url.pathname = `${process.env.BASE_PATH ?? ''}/api${url.pathname}`;
	return NextResponse.rewrite(url);
}

export async function middleware(req: NextRequest) {
	if (process.env.NODE_ENV === 'production') {
		console.log(
			'Request:',
			req.nextUrl.pathname,
			req.nextUrl.searchParams.toString(),
		);
	}
	// Rewrite /images/ to /api/images/
	if (req.method === 'GET' && req.nextUrl.pathname.startsWith('/images/')) {
		return handleImages(req);
	}
	// CSRF: https://lucia-auth.com/guides/validate-session-cookies/nextjs-pages
	if (req.method !== 'GET') {
		const originHeader = req.headers.get('Origin');
		// NOTE: You may need to use `X-Forwarded-Host` instead
		const hostHeader = req.headers.get('Host');
		const forwardedHeader = req.headers.get('X-Forwarded-Host');
		if (
			!originHeader ||
			!hostHeader ||
			!forwardedHeader ||
			!verifyRequestOrigin(originHeader, [hostHeader, forwardedHeader])
		) {
			console.warn(
				'CSRF failure:',
				originHeader,
				hostHeader,
				forwardedHeader,
			);
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
