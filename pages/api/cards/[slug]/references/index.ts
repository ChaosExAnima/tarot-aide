import { z } from 'zod';

import { ResponseBody, handlerWithError } from 'lib/api';
import { getCardReferences } from 'lib/cards/db';
import { userFromApiRequest } from 'lib/users';

import type { CardReference } from 'lib/cards/types';

export interface CardReferencesResponseBody extends ResponseBody {
	references: CardReference[];
}

const handler = handlerWithError<CardReferencesResponseBody>(
	['GET', 'POST'],
	async (req) => {
		const name = z.coerce.string().parse(req.query.slug);
		const user = await userFromApiRequest(req);
		if (req.method === 'GET') {
			const references = await getCardReferences(name, false, user.id);
			return {
				success: true,
				references,
			};
		}
	},
);

export default handler;
