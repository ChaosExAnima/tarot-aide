import { Fragment } from 'react';

import Page from 'components/page';
import {
	AllInSuit,
	AllMajorArcana,
	AllSuits,
	AnyCard,
	MinorCard,
} from 'lib/cards/constants';
import { displayCase } from 'lib/text';

export default function CardPage() {
	return (
		<Page title="Cards" breadcrumbs={[{ label: 'Cards', href: '/cards' }]}>
			<h1>All Cards</h1>
			<h2>Major Arcana</h2>
			<CardList cards={AllMajorArcana} />
			{AllSuits.map((suit) => (
				<Fragment key={suit}>
					<h2>The Suit of {displayCase(suit)}</h2>
					<CardList
						cards={AllInSuit.map(
							(card) => `${card} of ${suit}` satisfies MinorCard,
						)}
					/>
				</Fragment>
			))}
		</Page>
	);
}

interface CardListProps {
	cards: readonly AnyCard[];
}
function CardList({ cards }: CardListProps) {
	return (
		<ol>
			{cards.map((card) => (
				<li key={card}>{card}</li>
			))}
		</ol>
	);
}
