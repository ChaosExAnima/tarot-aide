import { faCancel, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup, Link } from '@nextui-org/react';
import { useRouter } from 'next/router';

import { CollapsibleButton } from 'components/buttons/collapsible';
import Page from 'components/page';
import Photo from 'components/photo';
import { cardUrl, displayCardFullName } from 'lib/cards/utils';
import { getSpreadById } from 'lib/spreads/db';
import { displaySpreadName } from 'lib/spreads/utils';
import { userFromServerContext } from 'lib/users';

import type { ExistingSpread } from 'lib/spreads/types';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

export interface SpreadPageProps {
	spread: ExistingSpread;
}

export default function SpreadSortPage({ spread }: SpreadPageProps) {
	const router = useRouter();
	return (
		<Page
			breadcrumbs={[
				{ label: 'Spreads', href: '/spreads' },
				{
					label: displaySpreadName(spread),
					href: `/spreads/${spread.id}`,
				},
				{ label: 'Sort', href: `/spreads/${spread.id}/sort` },
			]}
		>
			<header className="flex flex-col">
				<div className="flex flex-nowrap gap-4 items-center mb-4">
					<h1 className="grow font-bold text-2xl">
						{displaySpreadName(spread)}
					</h1>
					<ButtonGroup>
						<CollapsibleButton
							color="success"
							startContent={<FontAwesomeIcon icon={faSave} />}
						>
							Save
						</CollapsibleButton>
						<CollapsibleButton
							as={Link}
							href={`/spreads/${spread.id}`}
							color="danger"
							startContent={<FontAwesomeIcon icon={faCancel} />}
						>
							Cancel
						</CollapsibleButton>
					</ButtonGroup>
				</div>
			</header>
			{spread.photo && <Photo photo={spread.photo} />}
			{spread.positions.map(({ id, name, card, reversed }) => (
				<div key={id} className="flex gap-4 p-3 bg-content1 rounded-xl">
					<div className="flex-grow">
						{card && (
							<Link href={cardUrl(card.name, reversed)}>
								{displayCardFullName(card)}
							</Link>
						)}
						{name && card ? (
							<span className="text-content4 ml-2">{name}</span>
						) : (
							name
						)}
					</div>
					{reversed && (
						<span className="text-content4">Reversed</span>
					)}
				</div>
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
	const id = Number(context.params?.id);
	if (!id || isNaN(id)) {
		return { notFound: true };
	}
	const user = await userFromServerContext(context);
	const spread = await getSpreadById(id, user.id);
	if (!spread) {
		return { notFound: true };
	}

	return {
		props: {
			spread,
		},
	};
}
