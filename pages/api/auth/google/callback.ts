import { OAuth2RequestError } from 'arctic';

import { ApiError, handlerWithError } from 'lib/api';
import { google, lucia } from 'lib/auth';
import db from 'lib/db';
import { emailIsAllowed } from 'lib/users';

const handler = handlerWithError(['GET'], async (req, res) => {
	const code = req.query.code?.toString() ?? null;
	const state = req.query.state?.toString() ?? null;
	const storedState = req.cookies.google_state ?? null;
	const storedVerifier = req.cookies.google_verifier ?? null;
	if (!code || !state || !storedVerifier || state !== storedState) {
		throw new ApiError(400, 'Missing fields');
	}
	try {
		const tokens = await google.validateAuthorizationCode(
			code,
			storedVerifier,
		);
		const access = tokens.accessToken();
		const userRequest = await fetch(
			`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access}`,
		);
		if (!userRequest.ok) {
			throw new ApiError(500, 'Cannot get user information');
		}
		const userInfo = (await userRequest.json()) as GoogleUserInfo;

		let existingUser = await db.user.findFirst({
			where: {
				OR: [{ email: userInfo.email }, { googleId: userInfo.id }],
			},
		});
		if (!existingUser) {
			if (emailIsAllowed(userInfo.email)) {
				existingUser = await db.user.create({
					data: {
						name: userInfo.given_name,
						email: userInfo.email,
						googleId: userInfo.id,
					},
				});
			} else {
				throw new ApiError(403, 'User not found');
			}
		} else if (existingUser.email !== userInfo.email) {
			existingUser = await db.user.update({
				where: { id: existingUser.id },
				data: {
					email: userInfo.email,
				},
			});
		}

		const session = await lucia.createSession(existingUser.id, {});
		res.appendHeader(
			'Set-Cookie',
			lucia.createSessionCookie(session.id).serialize(),
		).redirect('/');
	} catch (e) {
		if (e instanceof OAuth2RequestError) {
			throw new ApiError(400, 'OAuth request failed');
		}
		throw e;
	}
});

export default handler;

interface GoogleUserInfo {
	id: string;
	email: string;
	verified_email: boolean;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
}
