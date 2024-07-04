import { z } from 'zod';

import { ApiError, ResponseBody, handlerWithError } from 'lib/api';
import { getCardFromName } from 'lib/cards/utils';
import prisma from 'lib/db';
import { dbToExistingSpread } from 'lib/spreads/db';
import { ExistingSpread } from 'lib/spreads/types';
import { userFromApiRequest } from 'lib/users';

import type { Prisma } from '@prisma/client';

export const positionSchema = z.object({
	id: z.number().optional(),
	name: z.string().optional().default(''),
	card: z.string().optional().nullable(),
	reversed: z.boolean().default(false).optional(),
	notes: z.string().optional().nullable(),
	order: z.number().optional().default(0),
});
export type PositionUpdate = z.infer<typeof positionSchema>;

export const spreadSchema = z.object({
	name: z.string().optional(),
	date: z
		.date()
		.refine((date) => date <= new Date(), {
			message: 'Date cannot be in the future',
		})
		.optional(),
	notes: z.string().optional().nullable(),
	positions: z.array(positionSchema).optional(),
});

export type SpreadUpdateRequest = z.infer<typeof spreadSchema>;

export interface SpreadUpdateResponseBody extends ResponseBody {
	spread?: ExistingSpread;
}

const handler = handlerWithError<SpreadUpdateResponseBody>(async (req) => {
	const spreadId = z.coerce.number().positive().int().parse(req.query.id);
	if (!spreadId) {
		throw new ApiError(400, 'Missing spread ID');
	}
	const user = await userFromApiRequest(req);
	const userId = user.id;
	let spread = await prisma.spread.findFirstOrThrow({
		where: { id: spreadId, userId },
		include: { positions: true, media: true },
	});
	switch (req.method) {
		case 'GET':
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
			const body = spreadSchema.parse(req.body);
			const updatePositionIds =
				body.positions
					?.map(({ id }) => id)
					.filter((id): id is number => !!id && id > 0) ?? [];
			let positions = undefined;
			if (body.positions) {
				positions = {
					create: body.positions
						.filter((pos) => !pos.id || pos.id < 0)
						.map((pos) => ({ ...pos, id: undefined })),
					update: body.positions
						.filter((pos) => !!pos.id && pos.id > 0)
						.map((pos) => ({
							where: { id: pos.id },
							data: bodyToDb(pos),
						})),
					delete: spread.positions.filter(
						(pos) => !updatePositionIds.includes(pos.id),
					),
				};
			}
			spread = await prisma.spread.update({
				where: {
					id: Number(spreadId),
					userId,
				},
				data: {
					...body,
					positions,
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

function bodyToDb(body: PositionUpdate) {
	const position: Prisma.PositionCreateWithoutSpreadInput = {
		name: body.name ?? '',
		card: null,
		reversed: false,
		notes: body.notes,
		order: body.order,
	};
	if (!body.card) {
		return position;
	}
	position.card = body.card;
	position.reversed = body.reversed;
	const tarotCard = getCardFromName(body.card);
	if (tarotCard) {
		position.card =
			'shortName' in tarotCard ? tarotCard.shortName : tarotCard.name;
		position.suit = tarotCard.suit;
	}
	return position;
}
