import { fetchFromApi } from 'lib/api';

import type {
	CardReferenceSchema,
	CardReferencesResponseBody,
} from 'pages/api/cards/[slug]/references';

export async function queryCardReferences(
	cardName: string,
	reversed = false,
	limit = 0,
) {
	return fetchFromApi<CardReferencesResponseBody>(
		`/cards/${cardName}/references?reversed=${reversed}&limit=${limit}`,
	);
}

export async function mutateCreateCardReference(
	cardName: string,
	reference: CardReferenceSchema,
) {
	return fetchFromApi<CardReferencesResponseBody, CardReferenceSchema>(
		`/cards/${cardName}/references`,
		reference,
	);
}
