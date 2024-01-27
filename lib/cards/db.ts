import prisma from 'lib/db';

import { getDefaultCardReference } from './references';
import { isCard } from './utils';

import type { CardReference } from './types';
import type { Prisma } from '@prisma/client';

export async function getCardReferences(
	cardName: string,
	reversed = false,
	userId: number,
) {
	const dbReferences = await prisma.cardReference.findMany({
		where: { card: cardName, reversed, userId },
		orderBy: { createdAt: 'desc' },
	});
	const references = dbReferences.map(dbToCardReference);
	if (isCard(cardName)) {
		references.unshift(getDefaultCardReference(cardName, reversed));
	}
	return references;
}

export function dbToCardReference(
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
