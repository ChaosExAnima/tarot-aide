import { fetchFromApi } from 'lib/api';
import { type BaseSpreadPosition, isFilledPosition } from 'lib/spreads/types';

import type {
	CardReferencesRequest,
	CardReferencesResponseBody,
} from 'pages/api/cards/references';

export async function queryCardReferences(cards: BaseSpreadPosition[]) {
	const body: CardReferencesRequest = cards
		.filter(isFilledPosition)
		.map(({ card, reversed }) => ({
			name: card.name,
			reversed: !!reversed,
		}));
	return fetchFromApi<CardReferencesResponseBody>(
		`/api/cards/references`,
		body,
	);
}
queryCardReferences.key = (cards: BaseSpreadPosition[]) =>
	[
		'cards',
		'references',
		cards.map(({ card }) => card?.name).filter(Boolean),
	] as const;
