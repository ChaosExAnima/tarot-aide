import { GenericCard } from 'lib/cards/types';
import { Audio, Photo } from 'lib/types';

export interface SpreadPosition {
	position: string;
	description?: string;
	card?: GenericCard;
	notes?: string;
}

export interface FilledSpreadPosition extends SpreadPosition {
	card: GenericCard;
}

export interface GenericSpread {
	positions: SpreadPosition[];
}

export interface PatternSpread extends GenericSpread {
	name: string;
	description?: string;
}

export interface ExistingSpread extends GenericSpread {
	id: string;
	date: Date;
	notes?: string;
	image?: Photo;
	audio?: Audio;
}
