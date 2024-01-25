import { ApiError, headersFromRequest } from './api';
import prisma from './db';

import type { User } from '@prisma/client';
import type { GetServerSidePropsContext } from 'next';

let userId = 0;

export function userFromServerContext(context: GetServerSidePropsContext) {
	const headers = headersFromRequest(context.req);
	return loadUserFromHeaders(headers);
}

export async function loadUserFromHeaders(headers: Headers) {
	const email = headers.get('remote-email');
	const name = headers.get('remote-name');
	const groups = headers.get('remote-groups');
	if (!email || !name) {
		throw new ApiError(400, 'Headers not found');
	}

	let user = await loadUserFromEmail(email);
	if (!user) {
		user = await createUser(email, name, groups?.includes('admin'));
	}
	userId = user.id;
	return user;
}

export function loadUserFromEmail(email: string): Promise<User | null> {
	return prisma.user.findUnique({
		where: { email },
	});
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

export function getCurrentUserId(): number {
	return userId;
}
