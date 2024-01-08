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
	z.array(
		z.union([
			z.string(),
			z.object({ name: z.string(), reversed: z.boolean().optional() }),
		]),
	),
);

const handler = handlerWithError<CardReferencesResponseBody>(
	['GET'],
	async (req) => {
		if (!req.url || !req.headers.host) {
			throw new ApiError(400, 'Invalid request');
		}
		const url = new URL(req.url!, req.headers.host);
		const cardsParam = url.searchParams.get('cards');
		if (!cardsParam) {
			throw new ApiError(400, 'Missing cards');
		}
		const cards = cardsSchema.parse(cardsParam);

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
		cards.map(async (card) => {
			if (typeof card === 'string') {
				return [card, await getCardReferences(card)];
			}
			return [
				card.name,
				await getCardReferences(card.name, card.reversed),
			];
		}),
	);
	return Object.fromEntries(references.values());
}
