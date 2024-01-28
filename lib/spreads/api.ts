import { stringify } from 'superjson';

import { fetchFromApi } from 'lib/api';
import { MediaType } from 'lib/media';

import type { SpreadCreatedResponse } from 'pages/api/spread';
import type {
	SpreadUpdateRequest,
	SpreadUpdateResponseBody,
} from 'pages/api/spread/[id]';
import type { SpreadMediaUploadResponse } from 'pages/api/spread/[id]/media';

export async function mutateCreateSpread(
	{ name, positions = [], date }: SpreadUpdateRequest,
	photo: Blob | null,
) {
	const formData = new FormData();
	formData.append('date', stringify(date));
	if (name) {
		formData.append('name', name);
	}

	for (const position of positions) {
		formData.append('positions', JSON.stringify(position));
	}

	if (photo) {
		formData.append('photo', photo);
	}

	const response = await fetchFromApi<SpreadCreatedResponse>(
		'/spread',
		null,
		{ body: formData, method: 'POST' },
	);
	return response;
}

export async function mutateUpdateSpread(
	spreadId: number,
	body: SpreadUpdateRequest,
) {
	return fetchFromApi<Required<SpreadUpdateResponseBody>>(
		`/spread/${spreadId}`,
		body,
	);
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
	return fetchFromApi(
		`/spread/${spreadId}/media`,
		{ type },
		{
			method: 'DELETE',
		},
	);
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
