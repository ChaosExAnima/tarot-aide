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
}

export interface BaseTarotCard extends GenericCard {
	name: AnyCard;
	suit?: SuitWithMajor;
}

export interface MajorTarotCard extends BaseTarotCard {
	name: MajorCard;
	suit?: typeof MajorSuit;
}

export interface MinorTarotCard extends BaseTarotCard {
	name: MinorCard;
	shortName: MinorCardWithoutSuit;
	suit: Suit;
}

export type TarotCard = MajorTarotCard | MinorTarotCard;

export type CardMap = Map<AnyCard, TarotCard>;
