import { parse } from 'superjson';
import { z } from 'zod';

import { ResponseBody, handlerWithError } from 'lib/api';
import { getCardFromName } from 'lib/cards/utils';
import prisma from 'lib/db';
import { parseForm, processPhoto } from 'lib/media';
import { userFromApiRequest } from 'lib/users';

import { positionSchema } from './[id]/index';

import type { SuperJSONValue } from 'superjson/dist/types';

const bodySchema = z.object({
	date: z.preprocess(
		(arg) => parse(arg as SuperJSONValue),
		z.date().refine((date) => date <= new Date(), {
			message: 'Cannot create spreads in the future',
		}),
	),
	positions: z.array(positionSchema),
	name: z.string().optional(),
	template: z.boolean().optional(),
	notes: z.string().optional(),
});
export type SpreadCreateRequest = z.infer<typeof bodySchema>;

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
		const { positions, ...spreadBody } = bodySchema.parse(fields);
		const user = await userFromApiRequest(req);

		const spread = await prisma.spread.create({
			data: {
				...spreadBody,
				userId: user.id,
				name: spreadBody.name ?? `${positions.length}-card spread`,
			},
		});

		for (const position of positions) {
			const card = getCardFromName(position.name ?? '');
			if (!card) {
				continue;
			}
			await prisma.position.create({
				data: {
					name: position.name ?? '',
					spreadId: spread.id,
					card: 'shortName' in card ? card.shortName : card.name,
					suit: 'suit' in card ? card.suit : null,
					reversed: position.reversed,
				},
			});
		}

		if (files.photo?.length) {
			await processPhoto(files.photo[0], spread.id, user.id);
		}

		return {
			success: true,
			message: 'Spread created',
			spreadId: spread.id,
		};
	},
);
export default handler;
