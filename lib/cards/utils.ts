import { displayCase } from 'lib/text';
import { includes } from 'lib/types';

import * as constants from './constants';

import type { GenericCard, MinorTarotCard, TarotCard } from './types';

export function isSuit(suitName: string): suitName is constants.SuitWithMajor {
	return includes(constants.AllSuitsWithMajor, suitName);
}

export function isCard(cardName: string): cardName is constants.AnyCard {
	return includes(constants.AllCards, cardName);
}

export function isMajorCard(cardName: string): cardName is constants.MajorCard {
	return includes(constants.AllMajorArcana, cardName);
}

export function isMinorCard(cardName: string): cardName is constants.MinorCard {
	return includes(constants.AllMinorArcana, cardName);
}

export function isMinorTarotCard(card: GenericCard): card is MinorTarotCard {
	return isMinorCard(card.name) && 'shortName' in card;
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

export function displayCardShortName(card: GenericCard): string {
	let cardName = card.name;
	if (isMinorTarotCard(card)) {
		cardName = card.shortName;
	}
	return displayCase(cardName);
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
