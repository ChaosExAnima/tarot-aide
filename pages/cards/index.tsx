import { Fragment } from 'react';

import Card from 'components/card';
import Page from 'components/page';
import {
	AllInSuit,
	AllMajorArcana,
	AllSuits,
	AnyCard,
	MinorCard,
} from 'lib/cards/constants';
import { displayCase } from 'lib/text';

import classes from './cards.module.css';

export default function CardPage() {
	return (
		<Page title="Cards">
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
		<ol className={classes.cardWrapper}>
			{cards.map((card) => (
				<li key={card}>
					<Card
						card={{
							name: card,
							image: `https://picsum.photos/seed/${card}/300/550.webp?blur`,
						}}
					/>
				</li>
			))}
		</ol>
	);
}
