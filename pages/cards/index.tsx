import { Fragment } from 'react';

import Card from 'components/card';
import Page from 'components/page';
import {
	AllInSuite,
	AllMajorArcana,
	AllSuites,
	CardName,
	MinorCard,
} from 'lib/constants';
import { displayCase } from 'lib/text';

import classes from './cards.module.css';

export default function CardPage() {
	return (
		<Page title="Cards">
			<h1>All Cards</h1>
			<h2>Major Arcana</h2>
			<CardList cards={AllMajorArcana} />
			{AllSuites.map((suite) => (
				<Fragment key={suite}>
					<h2>The Suite of {displayCase(suite)}</h2>
					<CardList
						cards={AllInSuite.map(
							(card) => `${card} of ${suite}` satisfies MinorCard
						)}
					/>
				</Fragment>
			))}
		</Page>
	);
}

interface CardListProps {
	cards: readonly CardName[];
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
