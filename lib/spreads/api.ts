import { fetchFromApi } from 'lib/api';
import { MediaType } from 'lib/media';

import { SpreadPosition } from './types';

import type { DeckEditRequest, DeckEditResponse } from 'pages/api/decks';
import type { SpreadCreatedResponse } from 'pages/api/spread';
import type {
	SpreadUpdateRequest,
	SpreadUpdateResponseBody,
} from 'pages/api/spread/[id]';
import type { SpreadMediaUploadResponse } from 'pages/api/spread/[id]/media';

export function mutateCreateSpread() {
	return fetchFromApi<SpreadCreatedResponse>('/spread', {});
}

export async function mutateUpdateSpread(
	spreadId: number,
	body: SpreadUpdateRequest,
) {
	return fetchFromApi<
		Required<SpreadUpdateResponseBody>,
		SpreadUpdateRequest
	>(`/spread/${spreadId}`, body);
}

export async function mutateDeleteSpread(spreadId: number) {
	return fetchFromApi(`/spread/${spreadId}`, null, {
		method: 'DELETE',
	});
}

export async function mutateDeleteSpreadMedia(
	spreadId: number,
	type: MediaType,
) {
	return fetchFromApi(`/spread/${spreadId}/media?type=${type}`, null, {
		method: 'DELETE',
	});
}

export async function mutateUploadSpreadMedia(
	spreadId: number,
	type: MediaType,
	media: Blob,
) {
	const formData = new FormData();
	formData.set('type', type);
	formData.set('media', media);
	return fetchFromApi<SpreadMediaUploadResponse>(
		`/spread/${spreadId}/media`,
		null,
		{
			body: formData,
			method: 'PUT',
		},
	);
}

export function mutateCreateDeck(name: string) {
	return fetchFromApi<DeckEditResponse, DeckEditRequest>('/decks', {
		name,
	});
}

export function mutateUpdateDeck(
	id: string | null,
	name: string,
	notes?: string,
) {
	const path = id ? `/decks/${id}` : '/decks';
	return fetchFromApi<DeckEditResponse, DeckEditRequest>(path, {
		name,
		notes,
	});
}

export function mutateDeleteDeck(id: string) {
	return fetchFromApi<DeckEditResponse>(`/decks/${id}`, null, {
		method: 'DELETE',
	});
}

export function positionsToBody(
	positions: SpreadPosition[],
): SpreadUpdateRequest['positions'] {
	return positions.map((pos, index) => ({
		id: pos.id,
		name: pos.name ?? '',
		card: pos.card?.name,
		reversed: pos.reversed,
		notes: pos.notes,
		order: index,
	}));
}
