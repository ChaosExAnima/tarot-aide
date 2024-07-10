import React from 'react';

import ButtonLink from 'components/button-link';
import Page from 'components/page';
import { decksForUser } from 'lib/spreads/db';
import { redirectToLogin, userFromServerContext } from 'lib/users';

import type { Deck } from 'lib/spreads/types';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

interface DecksPageProps {
	decks: Deck[];
}

export default function DecksPage({ decks }: DecksPageProps) {
	return (
		<Page title="Decks" breadcrumbs={[{ label: 'Decks', href: '/decks' }]}>
			<ButtonLink color="primary" href="/decks/new">
				New Deck
			</ButtonLink>
			{decks.map((deck) => (
				<ButtonLink
					key={deck.id}
					color="secondary"
					className="text-slate-900"
					href={`/decks/${deck.id}`}
				>
					{deck.name}
				</ButtonLink>
			))}
		</Page>
	);
}

export async function getServerSideProps(
	context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<DecksPageProps>> {
	const user = await userFromServerContext(context);
	if (!user) {
		return redirectToLogin();
	}
	return {
		props: {
			decks: await decksForUser(user.id),
		},
	};
}
