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

export const AllInSuite = [...AllNumberCards, ...AllNameCards] as const;
export const AllSuites = ['coins', 'cups', 'swords', 'wands'] as const;
export type Suite = (typeof AllSuites)[number];

export const AllMinorArcana: readonly MinorCard[] = AllSuites.reduce<
	MinorCard[]
>(
	(prev, suite) => [
		...prev,
		...AllInSuite.map(
			(suiteCard) => `${suiteCard} of ${suite}` satisfies MinorCard
		),
	],
	[]
);
export type MinorCardWithoutSuite = NumberCard | NameCard;
export type MinorCard = `${MinorCardWithoutSuite} of ${Suite}`;

export const AllCards = [...AllMajorArcana, ...AllMinorArcana] as const;
export type CardName = MajorCard | MinorCard;
