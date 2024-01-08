import { parse } from 'superjson';
import { z } from 'zod';

import { ApiError, ResponseBody, handlerWithError } from 'lib/api';
import { getCardReferences } from 'lib/cards/db';

import type { CardReferenceMap } from 'lib/cards/types';
import type { SuperJSONValue } from 'superjson/dist/types';

export interface CardReferencesResponseBody extends ResponseBody {
	references: CardReferenceMap;
}

const cardsSchema = z.preprocess(
	(arg) => parse(arg as SuperJSONValue),
	z.array(z.object({ name: z.string(), reversed: z.coerce.boolean() })),
);
export type CardReferencesRequest = z.infer<typeof cardsSchema>;

const handler = handlerWithError<CardReferencesResponseBody>(
	['POST'],
	async (req) => {
		const cards = cardsSchema.parse(req.body);
		if (cards.length === 0) {
			throw new ApiError(400, 'No cards provided');
		}

		return {
			success: true,
			references: await getRefMap(cards),
		};
	},
);
export default handler;

async function getRefMap(
	cards: z.infer<typeof cardsSchema>,
): Promise<CardReferenceMap> {
	const references = await Promise.all(
		cards.map(async (card) => [
			card.name,
			await getCardReferences(card.name, card.reversed),
		]),
	);
	return Object.fromEntries(references.values());
}
