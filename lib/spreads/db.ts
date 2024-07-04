import { Position, Prisma } from '@prisma/client';

import { MajorSuit } from 'lib/cards/constants';
import {
	GenericCard,
	GenericOrTarotCard,
	MajorTarotCard,
	MinorTarotCard,
} from 'lib/cards/types';
import {
	getFullNameFromSuitAndCard,
	isMajorCard,
	isMinorCardWithoutSuit,
	isSuit,
} from 'lib/cards/utils';
import prisma from 'lib/db';
import { Audio, Media, MediaType, Photo } from 'lib/media';

import { ExistingSpread } from './types';

export async function getSpreadsForUser(
	userId: number,
	skip = 0,
): Promise<ExistingSpread[]> {
	const spreads = await prisma.spread.findMany({
		where: { userId },
		include: {
			positions: true,
			media: {
				where: { deleted: false },
			},
		},
		orderBy: { date: 'desc' },
		take: 10,
		skip,
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
			positions: { orderBy: { order: 'asc' } },
			media: {
				where: { deleted: false },
			},
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
		id: spread.id,
		name: spread.name,
		date: spread.date,
		positions: spread.positions.map((position) => ({
			id: position.id,
			name: position.name,
			reversed: position.reversed,
			card: cardFromPosition(position),
			notes: position.notes,
		})),
		photo: dbToSpreadMedia(spread.media, 'photo'),
		audio: dbToSpreadMedia(spread.media, 'audio'),
		notes: spread.notes,
	};
}

function dbToSpreadMedia(
	media: Prisma.MediaUncheckedCreateInput[],
	type: 'photo',
): Photo | null;
function dbToSpreadMedia(
	media: Prisma.MediaUncheckedCreateInput[],
	type: 'audio',
): Audio | null;
function dbToSpreadMedia(
	media: Prisma.MediaUncheckedCreateInput[],
	type: MediaType,
): Media | null {
	const found = media.find(({ type: mediaType }) => mediaType === type);
	if (!found) {
		return null;
	}
	return {
		type,
		path: found.path,
		width: found.width ?? undefined,
		height: found.height ?? undefined,
	};
}

function cardFromPosition(position: Position): GenericOrTarotCard | null {
	if (!position.card) {
		return null;
	}

	if (isMajorCard(position.card) && !position.suit) {
		return {
			name: position.card,
			suit: MajorSuit,
		} satisfies MajorTarotCard;
	}
	if (
		isMinorCardWithoutSuit(position.card) &&
		position.suit &&
		isSuit(position.suit)
	) {
		return {
			name: getFullNameFromSuitAndCard(position.suit, position.card),
			shortName: position.card,
			suit: position.suit,
		} satisfies MinorTarotCard;
	}
	return { name: position.card } satisfies GenericCard;
}
