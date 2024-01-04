import React from 'react';

import ButtonLink from 'components/button-link';
import Page from 'components/page';
import { ExistingSpread } from 'lib/spreads/types';

const spreads: ExistingSpread[] = [
	{ id: '1', date: new Date(2024, 0, 1), cards: [] },
	{ id: '2', date: new Date(2024, 0, 2), cards: [] },
	{ id: '3', date: new Date(2024, 0, 3), cards: [] },
	{ id: '4', date: new Date(2024, 0, 4), cards: [] },
	{ id: '5', date: new Date(2024, 0, 5), cards: [] },
];

export default function SpreadsPage() {
	return (
		<Page>
			{spreads.map((spread) => (
				<ButtonLink
					href={`/spreads/${spread.id}`}
					key={spread.id}
					className="text-slate-900"
					color="secondary"
				>
					{spread.date.toDateString()}
				</ButtonLink>
			))}
			<ButtonLink href="/spreads/new">New Spread</ButtonLink>
		</Page>
	);
}
