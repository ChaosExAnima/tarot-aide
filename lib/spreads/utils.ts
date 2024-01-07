import { pluralize, displayRelativeDate } from 'lib/text';

import { ExistingSpread } from './types';

export function displaySpreadName(spread: ExistingSpread): string {
	if (spread.name) {
		return spread.name;
	}

	const { positions, date } = spread;
	return `${positions.length} card${pluralize(
		positions.length,
	)} spread ${displayRelativeDate(date)}`;
}
