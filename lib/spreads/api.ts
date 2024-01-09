import { stringify } from 'superjson';

import { fetchFromApi } from 'lib/api';
import { MediaType } from 'lib/media';

import type {
	SpreadCreateRequestBody,
	SpreadCreatedResponse,
} from 'pages/api/spread';
import type {
	SpreadUpdateRequestBody,
	SpreadUpdateResponseBody,
} from 'pages/api/spread/[id]';
import type { SpreadMediaUploadResponse } from 'pages/api/spread/[id]/media';

export async function mutateCreateSpread(
	{ cards, date }: SpreadCreateRequestBody,
	photo: Blob | null,
) {
	const formData = new FormData();
	formData.append('date', stringify(date));
	cards.forEach((card) => formData.append('cards', card));
	if (photo) {
		formData.append('photo', photo);
	}

	const response = await fetchFromApi<SpreadCreatedResponse>(
		'/api/spread',
		null,
		{ body: formData, method: 'POST' },
	);
	return response;
}

export async function mutateUpdateSpread(
	spreadId: number,
	body: SpreadUpdateRequestBody,
) {
	return fetchFromApi<Required<SpreadUpdateResponseBody>>(
		`/api/spread/${spreadId}`,
		body,
	);
}

export async function mutateDeleteSpread(spreadId: number) {
	return fetchFromApi(`/api/spread/${spreadId}`, null, {
		method: 'DELETE',
	});
}

export async function mutateDeleteSpreadMedia(
	spreadId: number,
	type: MediaType,
) {
	return fetchFromApi(
		`/api/spread/${spreadId}/media`,
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
		`/api/spread/${spreadId}/media`,
		null,
		{
			body: formData,
			method: 'PUT',
		},
	);
}
