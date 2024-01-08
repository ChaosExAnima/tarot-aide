import { stringify } from 'superjson';

import { ResponseBody, ResponseWithError, fetchFromApi } from 'lib/api';

import type {
	SpreadCreateRequestBody,
	SpreadCreatedResponse,
} from 'pages/api/spread';
import type {
	SpreadUpdateRequestBody,
	SpreadUpdateResponseBody,
} from 'pages/api/spread/[id]';

export async function mutateCreateSpread(
	{ cards, ...body }: SpreadCreateRequestBody,
	photo: Blob | null,
) {
	const formData = new FormData();
	formData.append('body', stringify(body));
	cards.forEach((card) => formData.append('cards', card));
	if (photo) {
		formData.append('photo', photo);
	}

	const response = await fetchFromApi<SpreadCreatedResponse>(
		'/api/spread',
		formData,
	);
	return response;
}

export type SpreadResponseBody = ResponseWithError<SpreadUpdateResponseBody>;

export async function mutateUpdateSpread(
	spreadId: number,
	body: SpreadUpdateRequestBody,
) {
	const response = await fetch(`/api/spread/${spreadId}`, {
		method: 'PATCH',
		body: JSON.stringify(body),
	});
	const responseBody: SpreadResponseBody = await response.json();
	if (!response.ok) {
		throw new Error(responseBody.message ?? 'Invalid response');
	}
	if (!responseBody.success) {
		throw new Error(responseBody.message ?? 'Invalid response');
	}
	return responseBody;
}

export async function mutateDeleteSpread(spreadId: number) {
	const response = await fetch(`/api/spread/${spreadId}`, {
		method: 'DELETE',
	});
	const body: ResponseBody = await response.json();
	if (!response.ok) {
		throw new Error(body.message ?? 'Invalid response');
	}
}
