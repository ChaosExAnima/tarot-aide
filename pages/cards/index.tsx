import Link from 'next/link';

import Page from 'components/page';
import {
	AllInSuite,
	AllMajorArcana,
	AllSuites,
	CardName,
	MinorCard,
} from 'lib/constants';
import { displayCase } from 'lib/text';

export default function CardPage() {
	return (
		<Page title="Cards">
			<h1>All Cards</h1>
			<h2>Major Arcana</h2>
			<CardList cards={AllMajorArcana} />
			{AllSuites.map((suite) => (
				<>
					<h2>The Suite of {displayCase(suite)}</h2>
					<CardList
						cards={AllInSuite.map(
							(card) => `${card} of ${suite}` satisfies MinorCard
						)}
					/>
				</>
			))}
		</Page>
	);
}

interface CardListProps {
	cards: readonly CardName[];
}
function CardList({ cards }: CardListProps) {
	return (
		<ol>
			{cards.map((card) => (
				<li key={card}>
					<Link href={`/cards/${card}`}>{displayCase(card)}</Link>
				</li>
			))}
		</ol>
	);
}
