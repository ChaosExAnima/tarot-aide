import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { Google } from 'arctic';
import { Lucia } from 'lucia';

import prisma from './db';

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === 'production',
		},
	},
	getUserAttributes(attributes) {
		return {
			email: attributes.email,
		};
	},
});

export const baseAuthUri = `${process.env.SITE_URL}${process.env.BASE_PATH}/api/auth`;

export const google = new Google(
	process.env.AUTH_GOOGLE_ID!,
	process.env.AUTH_GOOGLE_SECRET!,
	`${baseAuthUri}/google/callback`,
);

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	email: string;
}
