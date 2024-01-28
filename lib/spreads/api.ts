import { fetchFromApi } from 'lib/api';
import { MediaType } from 'lib/media';

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
