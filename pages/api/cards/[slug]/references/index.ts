import { z } from 'zod';

import { ResponseBody, handlerWithError } from 'lib/api';
import { dbToCardReference, getCardReferences } from 'lib/cards/db';
import prisma from 'lib/db';
import { userFromApiRequest } from 'lib/users';

import type { CardReference } from 'lib/cards/types';

export interface CardReferencesResponseBody extends ResponseBody {
	references: CardReference[];
}

const referenceSchema = z.object({
	text: z.string(),
	keywords: z.array(z.string()).optional(),
	reversed: z.boolean().default(false),
	source: z.string().optional(),
});
export type CardReferenceSchema = z.infer<typeof referenceSchema>;

const handler = handlerWithError<CardReferencesResponseBody>(
	['GET', 'POST'],
	async (req) => {
		const name = z.coerce.string().parse(req.query.slug);
		const user = await userFromApiRequest(req);
		const references = await getCardReferences(name, false, user.id);
		if (req.method === 'GET') {
			return {
				success: true,
				references,
			};
		} else if (req.method === 'POST') {
			const schema = referenceSchema.parse(req.body);
			const reference = await prisma.cardReference.create({
				data: {
					...schema,
					card: name,
					keywords: schema.keywords?.join(','),
					userId: user.id,
				},
			});
			references.push(dbToCardReference(reference));
			return {
				success: true,
				references,
			};
		}
	},
);

export default handler;
