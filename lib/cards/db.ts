import prisma from 'lib/db';

import { getDefaultCardReference } from './references';
import { isCard } from './utils';

import type { CardReference } from './types';
import type { Prisma } from '@prisma/client';

export async function cardReference(id: number, userId: string) {
	const dbReference = await prisma.cardReference.findFirst({
		where: { id, userId },
	});
	if (!dbReference) {
		throw new Error('Card reference not found');
	}
	return dbToCardReference(dbReference);
}

export async function getCardReferences(
	cardName: string,
	reversed = false,
	userId: string,
) {
	const dbReferences = await prisma.cardReference.findMany({
		where: { card: cardName, reversed, userId },
		orderBy: [{ starred: 'desc' }, { createdAt: 'desc' }],
	});
	const references = dbReferences.map(dbToCardReference);
	if (isCard(cardName)) {
		const defaultRef = getDefaultCardReference(cardName, reversed);
		references.push(defaultRef);
	}
	return references;
}

export async function listReferenceSources(userId: string): Promise<string[]> {
	const dbSources = await prisma.cardReference.findMany({
		where: { userId, source: { not: null } },
		select: { source: true },
		distinct: ['source'],
	});
	return dbSources
		.map((source) => source.source)
		.filter((source): source is string => !!source);
}

export function dbToCardReference(
	reference: Prisma.CardReferenceGetPayload<null>,
): CardReference {
	return {
		id: reference.id,
		text: reference.text,
		card: reference.card,
		reversed: reference.reversed,
		source: reference.source ?? undefined,
		starred: reference.starred,
		keywords: (reference.keywords ?? '')
			.split(',')
			.map((keyword) => keyword.trim()),
	};
}
