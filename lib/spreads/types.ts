import { GenericCard, TarotCard } from 'lib/cards/types';
import { Audio, Photo } from 'lib/media';
import { Nullable } from 'lib/types';

export interface BaseSpreadPosition {
	name: string;
	description: Nullable<string>;
	card: Nullable<GenericCard>;
	notes: Nullable<string>;
}

export interface EmptySpreadPosition extends BaseSpreadPosition {
	card: null;
}

export interface FilledSpreadPosition extends BaseSpreadPosition {
	id: number;
	card: GenericCard;
}

export type TarotSpreadPosition = Omit<FilledSpreadPosition, 'card'> & {
	card: TarotCard;
};

export type SpreadPosition = EmptySpreadPosition | FilledSpreadPosition;

export interface GenericSpread {
	name: string;
	positions: BaseSpreadPosition[];
}

export interface PatternSpread extends GenericSpread {
	description: Nullable<string>;
	positions: EmptySpreadPosition[];
}

export interface ExistingSpread extends GenericSpread {
	id: number;
	date: Date;
	description: Nullable<string>;
	positions: SpreadPosition[];
	notes: Nullable<string>;
	photo: Nullable<Photo>;
	audio: Nullable<Audio>;
}

export type TarotSpreadOnly<Spread extends GenericSpread = PatternSpread> =
	Omit<Spread, 'positions'> & {
		positions: TarotSpreadPosition[];
	};
