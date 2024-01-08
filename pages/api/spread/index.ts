import { Formidable } from 'formidable';
import { parse } from 'superjson';
import { z } from 'zod';

import { ResponseBody, handlerWithError } from 'lib/api';
import { isCard } from 'lib/cards/utils';
import prisma from 'lib/db';
import { processPhoto } from 'lib/media';
import { displayDate } from 'lib/text';
import { getCurrentUserId } from 'lib/users';

import type { SuperJSONValue } from 'superjson/dist/types';

const bodySchema = z.object({
	date: z
		.preprocess((arg) => parse(arg as SuperJSONValue), z.date())
		.refine((date) => date <= new Date(), {
			message: 'Cannot create spreads in the future',
		}),
	cards: z.array(
		z.string().refine(isCard, {
			message: 'Invalid card name',
		}),
	),
	name: z.string().optional(),
	description: z.string().optional(),
	template: z.boolean().optional(),
});
export type SpreadCreateRequestBody = z.infer<typeof bodySchema>;

export const config = {
	api: {
		bodyParser: false,
	},
};

export interface SpreadCreatedResponse extends ResponseBody {
	message: string;
	success: true;
	spreadId: number;
}

const handler = handlerWithError<SpreadCreatedResponse>(
	['POST'],
	async (req) => {
		const form = new Formidable({
			uploadDir: `uploads/${getCurrentUserId()}}`,
			keepExtensions: true,
			allowEmptyFiles: false,
			maxFiles: 1,
		});
		const [fields, files] = await form.parse(req);
		const { cards, ...spreadBody } = bodySchema.parse(fields);

		const spread = await prisma.spread.create({
			data: {
				...spreadBody,
				userId: getCurrentUserId(),
				name:
					spreadBody.name ??
					`${cards.length}-card spread on ${displayDate(
						spreadBody.date,
					)}`,
			},
		});

		for (const card of cards) {
			await prisma.position.create({
				data: {
					name: '',
					spreadId: spread.id,
					card,
				},
			});
		}

		if (files.photo?.length) {
			await processPhoto(files.photo[0], spread.id);
		}

		return {
			success: true,
			message: 'Spread created',
			spreadId: spread.id,
		};
	},
);
export default handler;
