import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { ResponseBody, ResponseWithError } from 'lib/api';
import prisma from 'lib/db';
import { dbToExistingSpread } from 'lib/spreads/db';
import { ExistingSpread } from 'lib/spreads/types';
import { getCurrentUserId } from 'lib/users';

const positionSchema = z.object({
	id: z.number().optional(),
	name: z.string().optional(),
	description: z.string().optional(),
	card: z.string().optional(),
});

const patchSchema = z.object({
	name: z.string().optional(),
	date: z.date().optional(),
	description: z.string().optional(),
	notes: z.string().optional(),
	positions: z.array(positionSchema).optional(),
});

export type SpreadUpdateRequestBody = z.infer<typeof patchSchema>;

export interface SpreadUpdateResponseBody extends ResponseBody {
	spread?: ExistingSpread;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseWithError<SpreadUpdateResponseBody>>,
) {
	const spreadId = req.query.id;
	if (!spreadId) {
		res.status(400).json({ success: false, message: 'Missing spread ID' });
		return;
	}
	const userId = getCurrentUserId();
	try {
		let spread = null;
		switch (req.method) {
			case 'DELETE':
				await prisma.spread.delete({
					where: {
						id: Number(spreadId),
						userId,
					},
				});
				break;
			case 'PUT':
			case 'PATCH':
				const body = patchSchema.parse(req.body);
				spread = await prisma.spread.update({
					where: {
						id: Number(spreadId),
						userId,
					},
					data: {
						...body,
						positions: {
							upsert: body.positions?.map((position) => {
								return {
									where: { id: position.id },
									update: position,
									create: { name: '', ...position },
								};
							}),
						},
					},
					include: { positions: true, media: true },
				});
			default:
				res.status(405).json({
					success: false,
					message: 'Method not allowed',
				});
				return;
		}
		res.status(200).json({
			success: true,
			spread: spread ? dbToExistingSpread(spread) : undefined,
		});
	} catch (err) {
		console.error(`Error deleting spread ${spreadId}:`, err);
		res.status(500).json({
			success: false,
			message: 'Could not delete spread',
		});
	}
}
