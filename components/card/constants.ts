import { createContext } from 'react';

export interface CardContext {
	ratio: number;
}

export const CardsData = createContext<CardContext>({
	ratio: 1,
});
