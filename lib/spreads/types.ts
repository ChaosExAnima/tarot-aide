import { GenericCard, TarotCard } from 'lib/cards/types';
import { Audio, Photo } from 'lib/media';
import { Nullable } from 'lib/types';

export interface SpreadPosition {
	position: string;
	description: Nullable<string>;
	card: Nullable<GenericCard>;
	notes: Nullable<string>;
}

export interface FilledSpreadPosition extends SpreadPosition {
	card: GenericCard;
}

export interface GenericSpread {
	positions: SpreadPosition[];
}

export interface PatternSpread extends GenericSpread {
	name: string;
	description: Nullable<string>;
}

export interface ExistingSpread extends GenericSpread {
	id: number;
	date: string;
	name: Nullable<string>;
	description: Nullable<string>;
	notes: Nullable<string>;
	photo: Nullable<Photo>;
	audio: Nullable<Audio>;
}

export type TarotSpreadPosition = Omit<SpreadPosition, 'card'> & {
	card: TarotCard;
};

export type TarotSpreadOnly<Spread extends GenericSpread = PatternSpread> =
	Omit<Spread, 'positions'> & {
		positions: TarotSpreadPosition[];
	};
