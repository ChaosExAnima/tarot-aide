import { displayCase } from 'lib/text';
import { includes } from 'lib/types';

import * as constants from './constants';

import type {
	GenericCard,
	MajorTarotCard,
	MinorTarotCard,
	TarotCard,
} from './types';

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

export function isNumberCard(
	cardName: string,
): cardName is constants.NumberCard {
	return includes(constants.AllNumberCards, cardName);
}

export function isMajorTarotCard(card: GenericCard): card is MajorTarotCard {
	return (
		isMajorCard(card.name) &&
		(!('suit' in card) || card.suit === constants.MajorSuit)
	);
}

export function isMinorTarotCard(card: GenericCard): card is MinorTarotCard {
	return (
		isMinorCard(card.name) &&
		'shortName' in card &&
		'suit' in card &&
		isSuit(card.suit as string)
	);
}

export function getCardFromName(
	cardName: constants.AnyCard | string,
): TarotCard | null {
	if (!isCard(cardName)) {
		return null;
	}
	if (isMajorCard(cardName)) {
		return { name: cardName, suit: constants.MajorSuit };
	}
	const [shortName, suit] = cardName.split(' of ') as [
		constants.MinorCardWithoutSuit,
		constants.Suit,
	];
	return { name: cardName, shortName, suit };
}

export function getFullNameFromSuitAndCard(
	suit: constants.Suit,
	card: constants.MinorCardWithoutSuit,
): constants.MinorCard {
	return `${card} of ${suit}`;
}

export function displaySuitName(suit: constants.SuitWithMajor): string {
	if (suit === constants.MajorSuit) {
		return 'Major Arcana';
	}
	return displayCase(suit);
}

export function displayCardShortName(
	card: GenericCard,
	numerals?: boolean,
): string {
	let cardName = card.name;
	if (isMinorTarotCard(card)) {
		if (numerals && isNumberCard(card.shortName)) {
			return constants.AllNumbersToNumerals[card.shortName];
		}
		cardName = card.shortName;
	} else if (card.name === 'high priestess') {
		cardName = 'priestess';
	} else if (card.name === 'wheel of fortune') {
		cardName = 'wheel';
	}
	return displayCase(cardName);
}

const CARDS_WITHOUT_THE = [
	'strength',
	'justice',
	'death',
	'temperance',
	'judgement',
] as const;
export function displayCardFullName(card: GenericCard): string {
	let cardName = card.name;
	if (isMajorTarotCard(card) && !includes(CARDS_WITHOUT_THE, card.name)) {
		cardName = `The ${cardName}`;
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
