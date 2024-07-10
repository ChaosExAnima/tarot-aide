import { z } from 'zod';

import { handlerWithError, ResponseBody } from 'lib/api';
import prisma from 'lib/db';
import { userFromApiRequest } from 'lib/users';

export interface DeckEditResponse extends ResponseBody {
	id: string;
}

const bodySchema = z.object({
	name: z.string().min(1),
});
export type DeckEditRequest = z.infer<typeof bodySchema>;

const handler = handlerWithError<DeckEditResponse>(
	['POST'],
	async (req, res) => {
		const user = await userFromApiRequest(req, res);
		const { name } = bodySchema.parse(req.body);
		const deck = await prisma.deck.create({
			data: { name, userId: user.id },
		});
		return {
			success: true,
			id: deck.id,
		};
	},
);

export default handler;
