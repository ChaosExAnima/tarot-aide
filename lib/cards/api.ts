import { fetchFromApi } from 'lib/api';

import type { CardReferencesResponseBody } from 'pages/api/cards/[slug]/references';
import type { CardReferenceSchema } from 'pages/api/references';

export async function queryCardReferences(
	cardName: string,
	reversed = false,
	limit = 0,
) {
	return fetchFromApi<CardReferencesResponseBody>(
		`/cards/${cardName}/references?reversed=${reversed}&limit=${limit}`,
	);
}

export async function mutateUpsertCardReference(
	reference: CardReferenceSchema,
	id?: number,
) {
	return fetchFromApi<CardReferencesResponseBody, CardReferenceSchema>(
		`/references${id ? `/${id}` : ''}`,
		reference,
	);
}
