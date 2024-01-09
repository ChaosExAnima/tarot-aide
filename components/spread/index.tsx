import OracleCard from 'components/cards';

import SpreadHeader from './header';
import { SpreadContext, useEditSpreadContext } from './hooks';
import SpreadPhoto from './photo';

import type { ExistingSpread } from 'lib/spreads/types';

export interface SpreadDisplayProps {
	spread: ExistingSpread;
}

export default function SpreadDisplay({ spread: initial }: SpreadDisplayProps) {
	const ctx = useEditSpreadContext(initial);
	return (
		<SpreadContext.Provider value={ctx}>
			<SpreadHeader />
			<SpreadPhoto />
			{ctx.spread.positions.map((spread) => (
				<OracleCard key={spread.id} spread={spread} />
			))}
		</SpreadContext.Provider>
	);
}
