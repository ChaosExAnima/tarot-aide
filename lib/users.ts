import { User } from 'lucia';

import { ApiError } from './api';
import { lucia } from './auth';

import type { ServerResponse } from 'http';
import type {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	NextApiRequest,
	NextApiResponse,
	Redirect,
} from 'next';
import type { NextApiRequestCookies } from 'next/dist/server/api-utils';

export function userFromServerContext(context: GetServerSidePropsContext) {
	return userFromSession(context.req.cookies, context.res);
}

export function redirectToLogin(): { redirect: Redirect } {
	return { redirect: { permanent: false, destination: '/login' } };
}

export async function securedRoute(
	context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Record<string, never>>> {
	const user = await userFromServerContext(context);
	if (!user) {
		return redirectToLogin();
	}
	return {
		props: {},
	};
}

export async function userFromApiRequest(
	req: NextApiRequest,
	res: NextApiResponse,
	loginRequired?: true,
): Promise<User>;
export async function userFromApiRequest(
	req: NextApiRequest,
	res: NextApiResponse,
	loginRequired: false,
): Promise<User | null>;
export async function userFromApiRequest(
	req: NextApiRequest,
	res: NextApiResponse,
	loginRequired = true,
) {
	const user = await userFromSession(req.cookies, res);
	if (!user && loginRequired) {
		throw new ApiError(400, 'Unauthorized');
	}
	return user;
}

const allowedEmails = (process.env.ALLOWED_EMAILS ?? '').split(',');

export function emailIsAllowed(email: string) {
	return allowedEmails.includes(email);
}

async function userFromSession(
	cookies: NextApiRequestCookies,
	res: ServerResponse,
) {
	const sessionId = cookies[lucia.sessionCookieName];
	if (!sessionId) {
		return null;
	}
	const { session, user } = await lucia.validateSession(sessionId);
	if (!session) {
		res.setHeader(
			'Set-Cookie',
			lucia.createBlankSessionCookie().serialize(),
		);
	}
	if (session && session.fresh) {
		res.setHeader(
			'Set-Cookie',
			lucia.createSessionCookie(session.id).serialize(),
		);
	}
	return user;
}
