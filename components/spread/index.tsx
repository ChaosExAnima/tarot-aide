import OracleCard from 'components/cards';
import Photo from 'components/photo';

import SpreadHeader from './header';
import { SpreadContext, useEditSpreadContext } from './hooks';

import type { ExistingSpread } from 'lib/spreads/types';

export interface SpreadDisplayProps {
	spread: ExistingSpread;
}

export default function SpreadDisplay({ spread: initial }: SpreadDisplayProps) {
	const ctx = useEditSpreadContext(initial);
	return (
		<SpreadContext.Provider value={ctx}>
			<SpreadHeader />
			<Photo photo={ctx.spread.photo ?? null} />
			{ctx.spread.positions.map((spread) => (
				<OracleCard key={spread.id} spread={spread} />
			))}
		</SpreadContext.Provider>
	);
}
