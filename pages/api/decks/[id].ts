import { z } from 'zod';

import { handlerWithError } from 'lib/api';
import prisma from 'lib/db';
import { userFromApiRequest } from 'lib/users';

import { deckBodySchema, DeckEditResponse } from './index';

const handler = handlerWithError<DeckEditResponse>(
	['POST', 'PUT', 'DELETE'],
	async (req, res) => {
		const id = z.coerce.string().min(1).parse(req.query.id);
		const user = await userFromApiRequest(req, res);
		if (req.method === 'DELETE') {
			await prisma.deck.delete({
				where: { id, userId: user.id },
			});
		} else {
			const { name, notes } = deckBodySchema.parse(req.body);
			await prisma.deck.update({
				where: { id, userId: user.id },
				data: { name, notes },
			});
		}
		return {
			success: true,
			id,
		};
	},
);

export default handler;
