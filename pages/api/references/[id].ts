import { z } from 'zod';

import { ApiError, handlerWithError } from 'lib/api';
import { cardReference, dbToCardReference } from 'lib/cards/db';
import prisma from 'lib/db';
import { userFromApiRequest } from 'lib/users';

import { CardReferenceResponse, referenceSchema } from './index';

const handler = handlerWithError<CardReferenceResponse>(
	['GET', 'POST'],
	async (req) => {
		const id = z.coerce.number().parse(req.query.id);
		const user = await userFromApiRequest(req);
		let reference = await cardReference(id, user.id);
		if (!reference) {
			throw new ApiError(404, 'Card reference not found');
		}

		if (req.method === 'POST') {
			const schema = referenceSchema.parse(req.body);
			const updatedReference = await prisma.cardReference.update({
				where: { id },
				data: {
					...schema,
					keywords:
						schema.keywords?.join(',') ??
						reference.keywords.join(','),
					userId: user.id,
				},
			});
			reference = dbToCardReference(updatedReference);
		}
		return {
			success: true,
			reference,
		};
	},
);

export default handler;
