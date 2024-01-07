import prisma from 'lib/db';
import { getCurrentUserId } from 'lib/users';

import { CardReference, GenericCard } from './types';

import type { Prisma } from '@prisma/client';

export async function getCardReferences(
	card: GenericCard,
): Promise<CardReference[]> {
	if (!card.id) {
		const dbCard = await prisma.card.findFirst({
			where: { name: card.name, userId: getCurrentUserId() },
			include: { references: true },
		});
		if (dbCard) {
			return dbCard.references.map(dbToCardReference);
		}
	} else {
		return (
			await prisma.cardReference.findMany({
				where: { cardId: card.id },
			})
		).map(dbToCardReference);
	}
	return [];
}

function dbToCardReference(
	reference: Prisma.CardReferenceGetPayload<null>,
): CardReference {
	return {
		...reference,
		source: reference.source ?? undefined,
	};
}
