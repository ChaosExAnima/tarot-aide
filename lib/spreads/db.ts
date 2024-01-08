import { Prisma } from '@prisma/client';

import prisma from 'lib/db';
import { isAudio, isPhoto } from 'lib/media';

import { ExistingSpread } from './types';

export async function getSpreadsForUser(
	userId: number,
): Promise<ExistingSpread[]> {
	const spreads = await prisma.spread.findMany({
		where: { userId },
		include: {
			positions: true,
			media: true,
		},
	});
	return spreads.map(dbToExistingSpread);
}

export async function getSpreadById(
	id: number,
	userId: number,
): Promise<ExistingSpread | null> {
	const spread = await prisma.spread.findFirst({
		where: { id, userId },
		include: {
			positions: true,
			media: true,
		},
	});
	if (!spread) {
		return null;
	}
	return dbToExistingSpread(spread);
}

export function dbToExistingSpread(
	spread: Prisma.SpreadGetPayload<{
		include: { positions: true; media: true };
	}>,
): ExistingSpread {
	return {
		...spread,
		positions: spread.positions.map((position) => ({
			...position,
			card: position.name ? { name: position.name } : null,
		})),
		photo: spread.media.find(isPhoto) ?? null,
		audio: spread.media.find(isAudio) ?? null,
	};
}
