import { GetServerSidePropsResult } from 'next';
import React from 'react';

import ButtonLink from 'components/button-link';
import Page from 'components/page';
import { getSpreadsForUser } from 'lib/spreads/db';
import { ExistingSpread } from 'lib/spreads/types';
import { displayRelativeDate } from 'lib/text';
import { getCurrentUserId } from 'lib/users';

interface SpreadsPageProps {
	spreads: ExistingSpread[];
}

export default function SpreadsPage({ spreads }: SpreadsPageProps) {
	return (
		<Page>
			{spreads.map((spread) => (
				<ButtonLink
					key={spread.id}
					color="secondary"
					className="text-slate-900"
					href={`/spreads/${spread.id}`}
				>
					{spread.positions.length}&nbsp;
					{spread.positions.length === 1 ? 'card' : 'cards'}&nbsp;
					{displayRelativeDate(spread.date)}
				</ButtonLink>
			))}
			<ButtonLink href="/spreads/new">New Spread</ButtonLink>
		</Page>
	);
}

export async function getServerSideProps(): Promise<
	GetServerSidePropsResult<SpreadsPageProps>
> {
	const userId = getCurrentUserId();
	return {
		props: {
			spreads: await getSpreadsForUser(userId),
		},
	};
}
