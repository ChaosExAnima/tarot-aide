import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import Page from 'components/page';
import { ExistingSpread, TarotSpreadOnly } from 'lib/spreads/types';

interface SpreadPageProps {
	spread: TarotSpreadOnly<ExistingSpread>;
}

export default function SpreadPage({ spread }: SpreadPageProps) {
	return (
		<Page>
			<h1>{spread.name}</h1>
			<p>{spread.date}</p>
			<section className="flex flex-col">
				{spread.positions.map((position) => (
					<div key={position.position}>
						<h2>{position.position}</h2>
						<p>{position.card.name}</p>
					</div>
				))}
			</section>
		</Page>
	);
}

type SpreadPageContext = {
	id: string;
};

export async function getServerSideProps(
	context: GetServerSidePropsContext<SpreadPageContext>,
): Promise<GetServerSidePropsResult<SpreadPageProps>> {
	return {
		props: {
			spread: {
				id: context.params!.id,
				name: 'Fake Spread',
				date: new Date(2024, 0, 1).toDateString(),
				positions: [
					{
						position: 'Mind',
						card: { name: 'death' },
					},
					{
						position: 'Body',
						card: {
							name: 'eight of wands',
							suit: 'wands',
							shortName: 'eight',
						},
					},
					{
						position: 'Spirit',
						card: {
							name: 'two of pentacles',
							suit: 'pentacles',
							shortName: 'two',
						},
					},
				],
			},
		},
	};
}
