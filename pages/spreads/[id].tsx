import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import Page from 'components/page';
import prisma from 'lib/db';
import { serializeDates } from 'lib/helpers';
import { isAudio, isPhoto } from 'lib/media';
import { getCurrentUserId } from 'lib/users';

import type { ExistingSpread } from 'lib/spreads/types';
import type { SerializedDates } from 'lib/types';

interface SpreadPageProps {
	spread: SerializedDates<ExistingSpread>;
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
						{position.card && <p>{position.card.name}</p>}
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
	const currentUserId = getCurrentUserId();
	const id = Number(context.params?.id);
	if (!id || isNaN(id)) {
		return { notFound: true };
	}
	const spread = await prisma.spread.findFirst({
		where: { id, userId: currentUserId },
		include: {
			positions: true,
			media: true,
		},
	});
	if (!spread) {
		return { notFound: true };
	}
	return {
		props: {
			spread: serializeDates({
				id: spread.id,
				name: spread.name || 'Untitled',
				description: spread.description,
				date: spread.date.toDateString(),
				notes: spread.note,
				positions: spread.positions.map((position) => ({
					position: position.name,
					card: position.card ? { name: position.card } : null,
					description: position.description,
					notes: position.note,
				})),
				photo: spread.media.find(isPhoto) ?? null,
				audio: spread.media.find(isAudio) ?? null,
			}),
		},
	};
}
