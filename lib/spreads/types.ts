import { GenericCard } from 'lib/cards/types';
import { Audio, Photo } from 'lib/types';

export interface SpreadCard {
	name: string;
	description?: string;
	card?: GenericCard;
	notes?: string;
}

export interface GenericSpread {
	cards: SpreadCard[];
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
