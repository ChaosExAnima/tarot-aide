import prisma from 'lib/db';
import { isFilledPosition, type SpreadPosition } from 'lib/spreads/types';
import { getCurrentUserId } from 'lib/users';

import { getDefaultCardReference } from './references';
import { isTarotCard } from './utils';

import type { CardReference, CardReferenceMap, GenericCard } from './types';
import type { Prisma } from '@prisma/client';

export async function getCardReferences(card: GenericCard, reversed = false) {
	const dbReferences = await prisma.cardReference.findMany({
		where: { card: card.name, reversed, userId: getCurrentUserId() },
	});
	const references = dbReferences.map(dbToCardReference);
	if (isTarotCard(card)) {
		references.push(getDefaultCardReference(card.name, reversed));
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
				getCardReferences(position.card, position.reversed),
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
		...reference,
		source: reference.source ?? undefined,
		keywords: (reference.keywords ?? '')
			.split(',')
			.map((keyword) => keyword.trim()),
	};
}
