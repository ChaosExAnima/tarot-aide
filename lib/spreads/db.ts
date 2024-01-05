import prisma from 'lib/db';
import { isAudio, isPhoto } from 'lib/media';
import { getCurrentUserId } from 'lib/users';

import { ExistingSpread } from './types';

export async function getSpreadById(
	id: number,
	userId = getCurrentUserId(),
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
	return {
		...spread,
		notes: spread.note,
		positions: spread.positions.map((position) => ({
			position: position.name,
			card: position.card ? { name: position.card } : null,
			description: position.description,
			notes: position.note,
		})),
		photo: spread.media.find(isPhoto) ?? null,
		audio: spread.media.find(isAudio) ?? null,
	};
}
