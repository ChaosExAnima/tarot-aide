import { stringify } from 'superjson';

import { fetchFromApi } from 'lib/api';

import type {
	SpreadCreateRequestBody,
	SpreadCreatedResponse,
} from 'pages/api/spread';
import type {
	SpreadUpdateRequestBody,
	SpreadUpdateResponseBody,
} from 'pages/api/spread/[id]';

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
