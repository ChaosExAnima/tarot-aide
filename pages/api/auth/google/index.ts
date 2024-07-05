import { generateCodeVerifier, generateState } from 'arctic';
import { serializeCookie } from 'oslo/cookie';

import { baseAuthUri, google } from 'lib/auth';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'GET') {
		res.status(404).end();
		return;
	}
	const state = generateState();
	const codeVerifier = generateCodeVerifier();

	const url = await google.createAuthorizationURL(state, codeVerifier);
	url.setRedirectURI(`${baseAuthUri}/google/callback`);
	url.addScopes('openid', 'profile', 'email');
	res.setHeader('Set-Cookie', [
		serializeCookie('google_state', state, {
			path: '/',
			secure: process.env.NODE_ENV === 'production',
			httpOnly: true,
			maxAge: 60 * 10,
			sameSite: 'lax',
		}),
		serializeCookie('google_verifier', codeVerifier, {
			path: '/',
			secure: process.env.NODE_ENV === 'production',
			httpOnly: true,
			maxAge: 60 * 10,
			sameSite: 'lax',
		}),
	]).redirect(url.toString());
}
