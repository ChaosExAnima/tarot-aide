import { GenericCard } from 'lib/cards/types';
import { Audio, Photo } from 'lib/media';
import { Nullable } from 'lib/types';

export interface BaseSpreadPosition<Card extends GenericCard = GenericCard> {
	id?: number;
	name: string;
	reversed?: boolean;
	description?: Nullable<string>;
	card?: Nullable<Card>;
	notes?: Nullable<string>;
}

export interface EmptySpreadPosition extends BaseSpreadPosition {
	id: number;
	card: null;
}

export interface FilledSpreadPosition extends BaseSpreadPosition {
	id: number;
	card: GenericCard;
}

export type SpreadPosition = EmptySpreadPosition | FilledSpreadPosition;

export function isFilledPosition(
	position: SpreadPosition,
): position is FilledSpreadPosition {
	return position.card !== null;
}

export interface GenericSpread {
	name: string;
	positions: BaseSpreadPosition[];
}

export interface PatternSpread extends GenericSpread {
	id: number;
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
