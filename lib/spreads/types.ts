import { GenericCard, TarotCard } from 'lib/cards/types';
import { Audio, Photo } from 'lib/media';

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
	date: string;
	name?: string;
	description?: string;
	notes?: string;
	image?: Photo;
	audio?: Audio;
}

export type TarotSpreadPosition = Omit<SpreadPosition, 'card'> & {
	card: TarotCard;
};

export type TarotSpreadOnly<Spread extends GenericSpread = PatternSpread> =
	Omit<Spread, 'positions'> & {
		positions: TarotSpreadPosition[];
	};
