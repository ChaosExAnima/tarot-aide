import { z } from 'zod';

import { ResponseBody, handlerWithError } from 'lib/api';
import { getCardFromName, isCard } from 'lib/cards/utils';
import prisma from 'lib/db';
import { parseForm, processPhoto } from 'lib/media';
import { getCurrentUserId } from 'lib/users';

const bodySchema = z.object({
	date: z.date().refine((date) => date <= new Date(), {
		message: 'Cannot create spreads in the future',
	}),
	cards: z.array(
		z.string().refine(isCard, {
			message: 'Invalid card name',
		}),
	),
	name: z.string().optional(),
	template: z.boolean().optional(),
	notes: z.string().optional(),
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
		const [fields, files] = await parseForm(req);
		const { cards, ...spreadBody } = bodySchema.parse(fields);

		const spread = await prisma.spread.create({
			data: {
				...spreadBody,
				userId: getCurrentUserId(),
				name: spreadBody.name ?? `${cards.length}-card spread`,
			},
		});

		for (const cardName of cards) {
			const card = getCardFromName(cardName);
			if (!card) {
				continue;
			}
			await prisma.position.create({
				data: {
					name: '',
					spreadId: spread.id,
					card: 'shortName' in card ? card.shortName : card.name,
					suit: 'suit' in card ? card.suit : null,
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
