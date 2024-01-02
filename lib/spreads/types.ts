import { GenericCard } from 'lib/cards/types';
import { Audio, Photo } from 'lib/types';

export interface SpreadCard {
	name: string;
	description?: string;
	card?: GenericCard;
	notes?: string;
}

export interface GenericSpread {
	name: string;
	cards: SpreadCard[];
}

export interface Spread extends GenericSpread {
	date: Date;
	notes?: string;
	image?: Photo;
	audio?: Audio;
}
