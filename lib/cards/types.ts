import {
	AnyCard,
	MajorCard,
	MinorCard,
	MinorCardWithoutSuit,
	Suit,
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
	suit: null | Suit;
}

export interface MajorTarotCard extends TarotCard {
	name: MajorCard;
	suit: null;
}

export interface MinorTarotCard extends TarotCard {
	name: MinorCard;
	shortName: MinorCardWithoutSuit;
	suit: Suit;
}

export type CardMap = Map<AnyCard, TarotCard>;
