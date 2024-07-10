import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React from 'react';

import Page from 'components/page';
import { deckById, spreadsByDeck } from 'lib/spreads/db';
import { userFromServerContext } from 'lib/users';

import type { Deck, ExistingSpread } from 'lib/spreads/types';

interface DeckPageProps {
	deck: Deck;
	spreads: ExistingSpread[];
}

export default function DeckPage({ deck, spreads }: DeckPageProps) {
	return (
		<Page title="Deck">
			<h1 className="text-6xl font-bold text-center mb-2">{deck.name}</h1>
			{spreads.length > 0 && (
				<ul>
					{spreads.map((spread) => (
						<li key={spread.id}>{spread.name}</li>
					))}
				</ul>
			)}
			{spreads.length === 0 && (
				<p className="text-center text-lg">
					No spreads use this deck yet
				</p>
			)}
		</Page>
	);
}

export async function getServerSideProps(
	context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<DeckPageProps>> {
	const id = String(context.params?.id);
	if (!id) {
		return { notFound: true };
	}
	const user = await userFromServerContext(context);
	if (!user) {
		return {
			notFound: true,
		};
	}
	const deck = await deckById(id, user.id);
	if (!deck) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			deck,
			spreads: await spreadsByDeck(deck.id, user.id),
		},
	};
}
