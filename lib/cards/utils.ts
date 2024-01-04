import * as constants from './constants';

export function isSuit(suitName: string): suitName is constants.SuiteWithMajor {
	return constants.AllSuitesWithMajor.includes(suitName as any);
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
	suit: constants.SuiteWithMajor;
} {
	if (isMajorCard(cardName)) {
		return { card: cardName, suit: constants.MajorSuite };
	}
	const [card, suit] = cardName.split(' of ') as [
		constants.MinorCardWithoutSuite,
		constants.Suite,
	];
	return { card, suit };
}
