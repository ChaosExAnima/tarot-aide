import { Formidable } from 'formidable';
import { z } from 'zod';

import { isCard } from 'lib/cards/utils';
import prisma from 'lib/db';
import { processPhoto } from 'lib/media';
import { SpreadResponseBody } from 'lib/spreads/api';
import { getCurrentUserId } from 'lib/users';

import type { NextApiRequest, NextApiResponse } from 'next';
const bodySchema = z.object({
	date: z.coerce
		.date()
		.refine((date) => date <= new Date(), {
			message: 'Cannot create spreads in the future',
		})
		.default(() => new Date()),
	cards: z
		.array(
			z.string().refine((card) => isCard(card), {
				message: 'Invalid card name',
			}),
		)
		.nonempty(),
	name: z.string().optional(),
	description: z.string().optional(),
});

const form = new Formidable({
	uploadDir: 'uploads',
	keepExtensions: true,
	allowEmptyFiles: false,
	maxFiles: 1,
});

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<SpreadResponseBody>,
) {
	if (req.method !== 'POST') {
		res.status(405).json({ success: false, message: 'Method not allowed' });
		return;
	}

	try {
		const [fields, files] = await form.parse(req);
		const { cards, ...spreadBody } = bodySchema.parse(fields);

		const spread = await prisma.spread.create({
			data: {
				userId: getCurrentUserId(),
				...spreadBody,
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

		res.status(200).json({
			success: true,
			message: 'Spread created',
			spreadId: spread.id,
		});
	} catch (error) {
		console.log('Invalid request:', error);
		res.status(400).json({ success: false, message: 'Invalid request' });
		return;
	}
}