import { Card, CardBody, CardHeader, Image, Textarea } from '@nextui-org/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import NextImage from 'next/image';

import Page from 'components/page';
import { getSpreadById } from 'lib/spreads/db';
import { displayCase, displayRelativeDate } from 'lib/text';
import { getCurrentUserId } from 'lib/users';

import type { ExistingSpread } from 'lib/spreads/types';

interface SpreadPageProps {
	spread: ExistingSpread;
}

export default function SpreadPage({ spread }: SpreadPageProps) {
	return (
		<Page>
			<h1 className="font-bold text-2xl">
				{spread.name ?? `Spread ${displayRelativeDate(spread.date)}`}
			</h1>
			{spread.photo && (
				<Image
					as={NextImage}
					src={`/images/${spread.photo.path}`}
					width={spread.photo.width}
					height={spread.photo.width}
					alt="Tarot image"
				/>
			)}
			{spread.positions.map(
				(spread) =>
					spread.card && (
						<Card key={spread.card.name}>
							<CardHeader className="gap-2">
								{displayCase(spread.card.name)}
								<span className="text-content4">
									{spread.position}
								</span>
							</CardHeader>
							<CardBody>
								<Textarea
									minRows={1}
									placeholder="Notes go here"
									value={spread.notes ?? ''}
								/>
							</CardBody>
						</Card>
					),
			)}
		</Page>
	);
}

type SpreadPageContext = {
	id: string;
};

export async function getServerSideProps(
	context: GetServerSidePropsContext<SpreadPageContext>,
): Promise<GetServerSidePropsResult<SpreadPageProps>> {
	const currentUserId = getCurrentUserId();
	const id = Number(context.params?.id);
	if (!id || isNaN(id)) {
		return { notFound: true };
	}
	const spread = await getSpreadById(id, currentUserId);
	if (!spread) {
		return { notFound: true };
	}
	return {
		props: {
			spread,
		},
	};
}
