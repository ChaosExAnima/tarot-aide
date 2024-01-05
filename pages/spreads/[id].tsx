import { Card, CardBody, CardHeader, Image, Textarea } from '@nextui-org/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import NextImage from 'next/image';

import Page from 'components/page';
import { ExistingSpread, TarotSpreadOnly } from 'lib/spreads/types';
import { displayCase } from 'lib/text';

interface SpreadPageProps {
	spread: TarotSpreadOnly<ExistingSpread>;
}

export default function SpreadPage({ spread }: SpreadPageProps) {
	return (
		<Page>
			<h1>{spread.name}</h1>
			<p>{spread.date}</p>
			{spread.image && (
				<Image
					as={NextImage}
					src={spread.image.url}
					width={spread.image.width}
					height={spread.image.width}
					alt="Tarot image"
				/>
			)}
			{spread.positions.map((spread) => (
				<Card key={spread.card.name}>
					<CardHeader className="gap-2">
						{displayCase(spread.card.name)}
						<span className="text-content4">{spread.position}</span>
					</CardHeader>
					<CardBody>
						<Textarea minRows={1} placeholder="Notes go here" />
					</CardBody>
				</Card>
			))}
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
				image: {
					id: '1234',
					url: '/test.jpg',
					mimeType: 'image/jpeg',
					width: 1000,
					height: 1000,
				},
				positions: [
					{
						position: 'Self',
						card: {
							name: 'king of cups',
							suit: 'cups',
							shortName: 'king',
						},
					},
					{
						position: 'Conflict',
						card: { name: 'chariot' },
					},
					{
						position: 'Past',
						card: {
							name: 'page of wands',
							suit: 'wands',
							shortName: 'page',
						},
					},
					{
						position: 'Future',
						card: {
							name: 'two of cups',
							suit: 'cups',
							shortName: 'two',
						},
					},
					{
						position: 'Root',
						card: {
							name: 'queen of swords',
							suit: 'swords',
							shortName: 'queen',
						},
					},
					{
						position: 'Sky',
						card: {
							name: 'star',
						},
					},
				],
			},
		},
	};
}
