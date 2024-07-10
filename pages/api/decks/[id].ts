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
	['POST', 'PUT', 'DELETE'],
	async (req, res) => {
		const id = z.coerce.string().min(1).parse(req.query.id);
		const user = await userFromApiRequest(req, res);
		if (req.method === 'DELETE') {
			await prisma.deck.delete({
				where: { id, userId: user.id },
			});
		} else {
			const { name } = bodySchema.parse(req.body);
			await prisma.deck.update({
				where: { id, userId: user.id },
				data: { name },
			});
		}
		return {
			success: true,
			id,
		};
	},
);

export default handler;
