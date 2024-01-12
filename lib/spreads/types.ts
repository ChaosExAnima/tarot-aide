import { GenericCard } from 'lib/cards/types';
import { Audio, Photo } from 'lib/media';
import { Nullable } from 'lib/types';

export interface BaseSpreadPosition<Card extends GenericCard = GenericCard> {
	id?: number;
	name?: string;
	reversed?: boolean;
	card?: Nullable<Card>;
	notes?: Nullable<string>;
}

export interface EmptySpreadPosition extends BaseSpreadPosition {
	card: null;
}

export interface FilledSpreadPosition<Card extends GenericCard = GenericCard>
	extends BaseSpreadPosition<Card> {
	card: Card;
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
	positions: SpreadPosition[];
	notes?: Nullable<string>;
	photo?: Nullable<Photo>;
	audio?: Nullable<Audio>;
}
