import { GenericOrTarotCard } from 'lib/cards/types';
import { Audio, Photo } from 'lib/media';
import { Entity, Nullable } from 'lib/types';

export interface BaseSpreadPosition extends Entity {
	id?: number;
	name?: string;
	reversed?: boolean;
	card?: Nullable<GenericOrTarotCard>;
	notes?: Nullable<string>;
}

export interface EmptySpreadPosition extends BaseSpreadPosition {
	card?: null;
}

export interface FilledSpreadPosition extends BaseSpreadPosition {
	card: GenericOrTarotCard;
}

export type SpreadPosition = EmptySpreadPosition | FilledSpreadPosition;

export function isFilledPosition(
	position: BaseSpreadPosition,
): position is FilledSpreadPosition {
	return position.card !== null;
}

export interface GenericSpread {
	name: string;
	positions: BaseSpreadPosition[];
}

export interface PatternSpread extends GenericSpread {
	id: number;
	positions: EmptySpreadPosition[];
}

export interface ExistingSpread extends GenericSpread {
	id: number;
	date: Date;
	positions: FilledSpreadPosition[];
	notes?: Nullable<string>;
	photo?: Nullable<Photo>;
	audio?: Nullable<Audio>;
}
