import { z } from 'zod';

import { ApiError, ResponseBody, handlerWithError } from 'lib/api';
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

const handler = handlerWithError<SpreadUpdateResponseBody>(async (req) => {
	const spreadId = z.coerce.number().positive().int().parse(req.query.id);
	if (!spreadId) {
		throw new ApiError(400, 'Missing spread ID');
	}
	const userId = getCurrentUserId();
	let spread = null;
	switch (req.method) {
		case 'GET':
			spread = await prisma.spread.findFirstOrThrow({
				where: { id: spreadId, userId },
				include: { positions: true, media: true },
			});
			break;
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
		case 'POST':
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
			break;
		default:
			throw new ApiError(405, 'Method not allowed');
	}
	return {
		success: true,
		spread: spread ? dbToExistingSpread(spread) : undefined,
	};
});
export default handler;
