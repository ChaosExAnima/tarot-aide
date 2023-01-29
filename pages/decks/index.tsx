import Link from 'next/link';

import Page from 'components/page';

export default function DeckPage() {
	return (
		<Page title="Decks">
			<p>See all decks:</p>
			<ol>
				<ul>
					{[1, 2, 3].map((deck) => (
						<li key={deck}>
							<Link href={`/decks/${deck}`}>{deck}</Link>
						</li>
					))}
				</ul>
			</ol>
			<p>
				<Link href="/decks/new">Add a new deck</Link>
			</p>
		</Page>
	);
}
