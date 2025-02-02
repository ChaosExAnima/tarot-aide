import { z } from 'zod';

import { ResponseBody, handlerWithError } from 'lib/api';
import { dbToCardReference } from 'lib/cards/db';
import prisma from 'lib/db';
import { userFromApiRequest } from 'lib/users';

import type { CardReference } from 'lib/cards/types';

export interface CardReferenceResponse extends ResponseBody {
	reference: CardReference;
}

export const referenceSchema = z.object({
	card: z.string(),
	text: z.string(),
	keywords: z.array(z.string()).optional(),
	reversed: z.boolean().default(false),
	source: z.string().optional(),
	starred: z.boolean().default(false).optional(),
});
export type CardReferenceSchema = z.infer<typeof referenceSchema>;

const handler = handlerWithError<CardReferenceResponse>(
	['POST'],
	async (req, res) => {
		const newReference = referenceSchema.parse(req.body);
		const user = await userFromApiRequest(req, res);
		const reference = await prisma.cardReference.create({
			data: {
				...newReference,
				keywords: newReference.keywords?.join(','),
				userId: user.id,
			},
		});
		return {
			success: true,
			reference: dbToCardReference(reference),
		};
	},
);

export default handler;
