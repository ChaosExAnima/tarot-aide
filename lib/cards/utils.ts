import * as constants from './constants';
import { TarotCard } from './types';

export function isSuit(suitName: string): suitName is constants.SuitWithMajor {
	return constants.AllSuitsWithMajor.includes(suitName as any);
}

export function isCard(cardName: string): cardName is constants.AnyCard {
	return constants.AllCards.includes(cardName as any);
}

export function isMajorCard(cardName: string): cardName is constants.MajorCard {
	return constants.AllMajorArcana.includes(cardName as any);
}

export function isMinorCard(cardName: string): cardName is constants.MinorCard {
	return constants.AllMinorArcana.includes(cardName as any);
}

export function getCardAndSuitFromName(cardName: constants.AnyCard): {
	card: constants.AnyCardWithoutSuit;
	suit: constants.SuitWithMajor;
} {
	if (isMajorCard(cardName)) {
		return { card: cardName, suit: constants.MajorSuit };
	}
	const [card, suit] = cardName.split(' of ') as [
		constants.MinorCardWithoutSuit,
		constants.Suit,
	];
	return { card, suit };
}

export function getFullNameFromSuitAndCard(
	suit: constants.Suit,
	card: constants.MinorCardWithoutSuit,
): constants.MinorCard {
	return `${card} of ${suit}`;
}

export function getCardsFromSuit(suit: constants.SuitWithMajor): TarotCard[] {
	if (suit === constants.MajorSuit) {
		return constants.AllMajorArcana.map((name) => ({
			name,
			suit: constants.MajorSuit,
		}));
	}
	return constants.AllInSuit.map((name) => ({
		name: getFullNameFromSuitAndCard(suit, name),
		shortName: name,
		suit,
	}));
}
