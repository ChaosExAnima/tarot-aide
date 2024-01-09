import OracleCard from 'components/cards';
import Page from 'components/page';
import Photo from 'components/photo';
import SpreadHeader from 'components/spread/header';
import { getSpreadById } from 'lib/spreads/db';
import { getCurrentUserId } from 'lib/users';

import type { ExistingSpread } from 'lib/spreads/types';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

interface SpreadPageProps {
	spread: ExistingSpread;
}

export default function SpreadPage({ spread }: SpreadPageProps) {
	return (
		<Page>
			<SpreadHeader spread={spread} />
			<Photo photo={spread.photo ?? null} />
			{spread.positions.map((spread) => (
				<OracleCard key={spread.id} spread={spread} />
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
