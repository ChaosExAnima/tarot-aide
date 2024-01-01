import {
	CardName,
	MajorCard,
	MinorCard,
	MinorCardWithoutSuite,
	Suite,
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
	name: CardName;
	suite: null | Suite;
}

export interface MajorTarotCard extends TarotCard {
	name: MajorCard;
	suite: null;
}

export interface MinorTarotCard extends TarotCard {
	name: MinorCard;
	shortName: MinorCardWithoutSuite;
	suite: Suite;
}

export type CardMap = Map<CardName, TarotCard>;

export type Nullable<T> = T | null;
