export const AllMajorArcana = [
	'fool',
	'magician',
	'high priestess',
	'empress',
	'emperor',
	'hierophant',
	'lovers',
	'chariot',
	'strength',
	'hermit',
	'wheel of fortune',
	'justice',
	'hanged man',
	'death',
	'temperance',
	'devil',
	'tower',
	'star',
	'moon',
	'sun',
	'judgement',
	'world',
] as const;
export const MajorSuit = 'major' as const;
export type MajorCard = (typeof AllMajorArcana)[number];

export const AllNumberCards = [
	'ace',
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
	'ten',
] as const;
export type NumberCard = (typeof AllNumberCards)[number];

export const AllNameCards = ['page', 'knight', 'queen', 'king'] as const;
export type NameCard = (typeof AllNameCards)[number];

export const AllInSuit = [...AllNumberCards, ...AllNameCards] as const;
export const AllSuits = ['cups', 'pentacles', 'swords', 'wands'] as const;
export const AllSuitsWithMajor = [MajorSuit, ...AllSuits] as const;
export type Suit = (typeof AllSuits)[number];
export type SuitWithMajor = (typeof AllSuitsWithMajor)[number];

export const AllMinorArcana: readonly MinorCard[] = AllSuits.reduce<
	MinorCard[]
>(
	(prev, suit) => [
		...prev,
		...AllInSuit.map(
			(suitCard) => `${suitCard} of ${suit}` satisfies MinorCard,
		),
	],
	[],
);
export type MinorCardWithoutSuit = NumberCard | NameCard;
export type MinorCard = `${MinorCardWithoutSuit} of ${Suit}`;

export const AllCards = [...AllMajorArcana, ...AllMinorArcana] as const;
export type AnyCard = MajorCard | MinorCard;
export type AnyCardWithoutSuit = MajorCard | MinorCardWithoutSuit;