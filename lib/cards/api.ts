import { fetchFromApi } from 'lib/api';
import { slugify } from 'lib/text';

import type { CardReferencesResponse } from 'pages/api/cards/[slug]/references';
import type {
	CardReferenceResponse,
	CardReferenceSchema,
} from 'pages/api/references';

export async function queryCardReferences(
	cardName: string,
	reversed = false,
	limit = 0,
) {
	return fetchFromApi<CardReferencesResponse>(
		`/cards/${slugify(cardName)}/references?reversed=${Number(
			reversed,
		)}&limit=${limit}`,
	);
}

export async function mutateCreateCardReference(
	reference: CardReferenceSchema,
) {
	return fetchFromApi<CardReferenceResponse, CardReferenceSchema>(
		'/references',
		reference,
	);
}

export async function mutateUpdateCardReference(
	reference: Partial<CardReferenceSchema>,
	id: number,
) {
	return fetchFromApi<CardReferenceResponse, Partial<CardReferenceSchema>>(
		`/references/${id}`,
		reference,
	);
}

export async function mutateDeleteCardReference(id: number) {
	return fetchFromApi<CardReferenceResponse>(`/references/${id}`, undefined, {
		method: 'DELETE',
	});
}
