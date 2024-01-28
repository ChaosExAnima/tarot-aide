import { z } from 'zod';

import { ResponseBody, handlerWithError } from 'lib/api';
import { getCardReferences } from 'lib/cards/db';
import { userFromApiRequest } from 'lib/users';

import type { CardReference } from 'lib/cards/types';

export interface CardReferencesResponse extends ResponseBody {
	references: CardReference[];
	defaultReference: number;
}

const handler = handlerWithError<CardReferencesResponse>(
	['GET'],
	async (req) => {
		const name = z.coerce
			.string()
			.parse(req.query.slug)
			.replaceAll('-', ' ');
		const user = await userFromApiRequest(req);
		const references = await getCardReferences(name, false, user.id);
		const firstStarred = references.find((ref) => ref.starred);
		return {
			success: true,
			references,
			defaultReference: firstStarred?.id ?? 0,
		};
	},
);

export default handler;
