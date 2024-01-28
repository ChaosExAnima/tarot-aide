import { fetchFromApi } from 'lib/api';

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
		`/cards/${cardName}/references?reversed=${
			reversed ? '1' : '0'
		}&limit=${limit}`,
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
