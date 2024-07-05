import { generateCodeVerifier, generateState } from 'arctic';
import { serializeCookie } from 'oslo/cookie';

import { handlerWithError } from 'lib/api';
import { baseAuthUri, google } from 'lib/auth';

const handler = handlerWithError(['GET'], async (req, res) => {
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
});

export default handler;
