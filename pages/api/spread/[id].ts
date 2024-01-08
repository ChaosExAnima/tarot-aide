import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import prisma from 'lib/db';
import { dbToExistingSpread } from 'lib/spreads/db';
import { ExistingSpread } from 'lib/spreads/types';
import { ResponseBody, ResponseWithError } from 'lib/types';
import { getCurrentUserId } from 'lib/users';

const patchSchema = z.object({
	name: z.string().optional(),
	date: z.date().optional(),
	description: z.string().optional(),
	notes: z.string().optional(),
});

interface SpreadUpdateResponseBody extends ResponseBody {
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
		let spread = await prisma.spread.findUnique({
			where: {
				id: Number(spreadId),
			},
			include: { positions: true, media: true },
		});
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
				const data = patchSchema.parse(req.body);
				spread = await prisma.spread.update({
					where: {
						id: Number(spreadId),
						userId,
					},
					data,
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
