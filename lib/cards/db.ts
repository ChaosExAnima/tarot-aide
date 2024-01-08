import prisma from 'lib/db';
import { getCurrentUserId } from 'lib/users';

import { getDefaultCardReference } from './references';
import { CardReference, GenericCard } from './types';
import { isTarotCard } from './utils';

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
