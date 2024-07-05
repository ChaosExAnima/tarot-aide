import { format } from 'util';

import { ApiError, headersFromRequest } from './api';
import prisma from './db';

import type { User } from '@prisma/client';
import type { GetServerSidePropsContext, NextApiRequest } from 'next';

const allowedEmails = (process.env.ALLOWED_EMAILS ?? '').split(',');

export function emailIsAllowed(email: string) {
	return allowedEmails.includes(email);
}

export function userFromServerContext(context: GetServerSidePropsContext) {
	const headers = headersFromRequest(context.req);
	return loadUserFromHeaders(headers);
}

export function userFromApiRequest(req: NextApiRequest) {
	const headers = headersFromRequest(req);
	return loadUserFromHeaders(headers);
}

export function loadUserFromHeaders(headers: Headers) {
	const email = headers.get('remote-email');
	const name = headers.get('remote-name');
	const groups = headers.get('remote-groups');
	if (!email || !name) {
		if (
			process.env.NODE_ENV === 'development' ||
			process.env.BYPASS_AUTH === '1'
		) {
			return findOrCreateUser('admin@localhost', 'Admin', true);
		}
		throw new ApiError(
			400,
			format(
				'User headers not found: %o',
				Object.fromEntries(headers.entries()),
			),
		);
	}

	return findOrCreateUser(email, name, groups?.includes('admin'));
}

export async function findOrCreateUser(
	email: string,
	name?: string,
	admin = false,
): Promise<User> {
	const user = await prisma.user.findUnique({
		where: { email },
	});
	if (user) {
		return user;
	}
	return await createUser(email, name, admin);
}

export function createUser(
	email: string,
	name?: string,
	admin = false,
): Promise<User> {
	return prisma.user.create({
		data: { email, name, admin },
	});
}
