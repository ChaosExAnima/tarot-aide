import { ApiError, headersFromRequest } from './api';
import prisma from './db';

import type { User } from '@prisma/client';
import type { GetServerSidePropsContext, NextApiRequest } from 'next';

export function userFromServerContext(context: GetServerSidePropsContext) {
	const headers = headersFromRequest(context.req);
	return loadUserFromHeaders(headers);
}

export function userFromApiRequest(req: NextApiRequest) {
	const headers = headersFromRequest(req);
	return loadUserFromHeaders(headers);
}

export async function loadUserFromHeaders(headers: Headers) {
	const email = headers.get('remote-email');
	const name = headers.get('remote-name');
	const groups = headers.get('remote-groups');
	if (!email || !name) {
		throw new ApiError(400, 'Headers not found');
	}

	const user = await prisma.user.findUnique({
		where: { email },
	});
	if (user) {
		return user;
	}
	return await createUser(email, name, groups?.includes('admin'));
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
