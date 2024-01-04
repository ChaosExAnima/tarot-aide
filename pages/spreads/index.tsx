import React from 'react';

import ButtonLink from 'components/button-link';
import Page from 'components/page';
import { ExistingSpread } from 'lib/spreads/types';

const spreads: ExistingSpread[] = Array.from(Array(5).keys()).map((index) => ({
	id: `2024-01-0${index + 1}`,
	date: new Date(2024, 0, index + 1).toDateString(),
	positions: [],
}));

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
					{spread.date}
				</ButtonLink>
			))}
			<ButtonLink href="/spreads/new">New Spread</ButtonLink>
		</Page>
	);
}
