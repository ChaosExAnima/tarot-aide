import prisma from 'lib/db';
import { isFilledPosition, type SpreadPosition } from 'lib/spreads/types';
import { getCurrentUserId } from 'lib/users';

import { getDefaultCardReference } from './references';
import { isCard } from './utils';

import type { CardReference, CardReferenceMap } from './types';
import type { Prisma } from '@prisma/client';

export async function getCardReferences(cardName: string, reversed = false) {
	const dbReferences = await prisma.cardReference.findMany({
		where: { card: cardName, reversed, userId: getCurrentUserId() },
	});
	const references = dbReferences.map(dbToCardReference);
	if (isCard(cardName)) {
		references.push(getDefaultCardReference(cardName, reversed));
	}
	return references;
}

export async function getCardReferenceMap(
	positions: SpreadPosition[],
): Promise<CardReferenceMap> {
	const references = await Promise.all(
		positions
			.filter(isFilledPosition)
			.map((position) =>
				getCardReferences(position.card.name, position.reversed),
			),
	);
	return Object.fromEntries(
		positions.map((position, index) => [position.id, references[index]]),
	);
}

function dbToCardReference(
	reference: Prisma.CardReferenceGetPayload<null>,
): CardReference {
	return {
		id: reference.id,
		text: reference.text,
		reversed: reference.reversed,
		source: reference.source ?? undefined,
		keywords: (reference.keywords ?? '')
			.split(',')
			.map((keyword) => keyword.trim()),
	};
}
