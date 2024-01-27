import { fetchFromApi } from 'lib/api';

import type { CardReferencesResponseBody } from 'pages/api/cards/[slug]/references';

export async function queryCardReferences(
	name: string,
	reversed = false,
	limit = 0,
) {
	return fetchFromApi<CardReferencesResponseBody>(
		`/cards/${name}/references?reversed=${reversed}&limit=${limit}`,
	);
}
