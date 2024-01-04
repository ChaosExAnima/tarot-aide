import {
	AnyCard,
	MajorCard,
	MajorSuit,
	MinorCard,
	MinorCardWithoutSuit,
	Suit,
	SuitWithMajor,
} from './constants';

export interface GenericDeck {
	name: string;
	cards: GenericCard[];
}

export interface TarotDeck extends GenericDeck {
	cards: TarotCard[];
	isTarot: true;
}

export interface GenericCard {
	name: string;
	image?: string;
}

export interface TarotCard extends GenericCard {
	name: AnyCard;
	shortName?: MinorCardWithoutSuit;
	suit: SuitWithMajor;
}

export interface MajorTarotCard extends TarotCard {
	name: MajorCard;
	shortName: undefined;
	suit: typeof MajorSuit;
}

export interface MinorTarotCard extends TarotCard {
	name: MinorCard;
	shortName: MinorCardWithoutSuit;
	suit: Suit;
}

export type CardMap = Map<AnyCard, TarotCard>;
