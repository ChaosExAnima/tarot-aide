import React from 'react';

import ButtonLink from 'components/button-link';
import NewSpreadButton from 'components/buttons/new-spread';
import Page from 'components/page';
import { getSpreadsForUser } from 'lib/spreads/db';
import { displaySpreadName } from 'lib/spreads/utils';
import { displayRelativeDate } from 'lib/text';
import { userFromServerContext } from 'lib/users';

import type { ExistingSpread } from 'lib/spreads/types';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

interface SpreadsPageProps {
	spreads: ExistingSpread[];
}

export default function SpreadsPage({ spreads }: SpreadsPageProps) {
	return (
		<Page breadcrumbs={[{ label: 'Spreads', href: '/spreads' }]}>
			<NewSpreadButton />
			{spreads.map((spread) => (
				<ButtonLink
					key={spread.id}
					color="secondary"
					className="text-slate-900"
					href={`/spreads/${spread.id}`}
				>
					{displaySpreadName(spread)}
					<span className="opacity-60 font-normal">
						{displayRelativeDate(spread.date)}
					</span>
				</ButtonLink>
			))}
		</Page>
	);
}

export async function getServerSideProps(
	context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<SpreadsPageProps>> {
	const user = await userFromServerContext(context);
	return {
		props: {
			spreads: await getSpreadsForUser(user.id),
		},
	};
}
