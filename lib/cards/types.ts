import type {
	AnyCard,
	MajorCard,
	MajorSuit,
	MinorCard,
	MinorCardWithoutSuit,
	Suit,
	SuitWithMajor,
} from './constants';

export interface GenericCard {
	id?: number;
	name: string;
	references?: CardReference[];
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

export interface CardReference {
	text: string;
	reversed: boolean;
	source?: string;
}

export type CardWithRefs<CardType extends GenericCard = GenericCard> = Omit<
	CardType,
	'references'
> &
	Required<Pick<CardType, 'references'>>;
