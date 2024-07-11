import { z } from 'zod';

import { handlerWithError, ResponseBody } from 'lib/api';
import prisma from 'lib/db';
import { userFromApiRequest } from 'lib/users';

export interface DeckEditResponse extends ResponseBody {
	id: string;
}

export const deckBodySchema = z.object({
	name: z.string().min(1),
	notes: z.string().optional(),
});
export type DeckEditRequest = z.infer<typeof deckBodySchema>;

const handler = handlerWithError<DeckEditResponse>(
	['POST'],
	async (req, res) => {
		const user = await userFromApiRequest(req, res);
		const { name, notes } = deckBodySchema.parse(req.body);
		const deck = await prisma.deck.create({
			data: { name, notes, userId: user.id },
		});
		return {
			success: true,
			id: deck.id,
		};
	},
);

export default handler;
