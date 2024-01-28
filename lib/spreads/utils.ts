import type { ExistingSpread } from './types';

export function displaySpreadName(spread: ExistingSpread): string {
	return spread.name || 'New spread';
}
